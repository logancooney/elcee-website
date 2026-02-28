"use client";

import { useState, useEffect } from "react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingCalendarProps {
  onSelectSlots: (date: string, times: string[]) => void;
}

export default function BookingCalendar({ onSelectSlots }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(1); // Duration in hours
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Studio hours: 10am - 11pm, 30-minute increments
  const generateTimeSlots = (): string[] => {
    const slots = [];
    for (let hour = 10; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 23) { // Don't add :30 for last hour
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  const allTimeSlots = generateTimeSlots();

  // Duration options in hours
  const durationOptions = [
    { value: 0.5, label: '30 minutes' },
    { value: 1, label: '1 hour' },
    { value: 1.5, label: '1 hour 30 minutes' },
    { value: 2, label: '2 hours' },
    { value: 2.5, label: '2 hours 30 minutes' },
    { value: 3, label: '3 hours' },
    { value: 3.5, label: '3 hours 30 minutes' },
    { value: 4, label: '4 hours' },
    { value: 5, label: '5 hours' },
    { value: 6, label: '6 hours' },
  ];

  // Fetch booked slots for selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`/api/availability?date=${dateStr}`);
        const data = await response.json();
        
        setBookedSlots(data.bookedSlots || []);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
        setBookedSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
    setStartTime(""); // Reset selection when date changes
  }, [selectedDate]);

  // Calculate end time based on start time + duration
  const calculateEndTime = (start: string, durationHours: number): string => {
    const [hours, minutes] = start.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationHours * 60;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  // Check if a time range is available
  const isTimeRangeAvailable = (start: string, durationHours: number): boolean => {
    if (!start) return false;

    const [startHour, startMinute] = start.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = startTotalMinutes + durationHours * 60;

    // Check if end time goes past 11:30pm (23:30)
    if (endTotalMinutes > 23 * 60 + 30) return false;

    // Get all 30-minute slots in the requested range
    const slotsNeeded: string[] = [];
    for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += 30) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      slotsNeeded.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }

    // Check if any needed slot is booked
    return !slotsNeeded.some(slot => bookedSlots.includes(slot));
  };

  const availableStartTimes = allTimeSlots.filter(time => {
    // Filter out times where the selected duration wouldn't fit
    return isTimeRangeAvailable(time, duration);
  });

  // Generate array of time slots for the selected range
  const getSelectedTimeSlots = (): string[] => {
    if (!startTime || !duration) return [];

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = startTotalMinutes + duration * 60;

    const slots: string[] = [];
    for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += 30) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
    return slots;
  };

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Can't book past dates
    if (date < today) return false;
    
    // Can't book more than 3 months ahead
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (date > maxDate) return false;
    
    return true;
  };

  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date)) return;
    setSelectedDate(date);
    setStartTime("");
  };

  const handleConfirm = () => {
    if (!selectedDate || !startTime || !duration) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    const slots = getSelectedTimeSlots();
    onSelectSlots(dateStr, slots);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
    setStartTime("");
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
    setStartTime("");
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const endTime = startTime ? calculateEndTime(startTime, duration) : "";
  const isAvailable = startTime ? isTimeRangeAvailable(startTime, duration) : false;

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button 
          type="button"
          onClick={prevMonth}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 transition"
        >
          ←
        </button>
        <h3 className="text-2xl font-bold">{monthName}</h3>
        <button 
          type="button"
          onClick={nextMonth}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 transition"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-8">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-400 pb-2">
            {day}
          </div>
        ))}
        
        {/* Day cells */}
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }
          
          const available = isDateAvailable(date);
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          
          return (
            <button
              type="button"
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              disabled={!available}
              className={`
                aspect-square flex items-center justify-center border transition
                ${available ? 'hover:bg-white hover:text-black cursor-pointer' : 'opacity-30 cursor-not-allowed'}
                ${isSelected ? 'bg-white text-black font-bold' : 'border-white/20'}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="mt-8 pt-8 border-t border-white/20">
          <h4 className="text-xl font-bold mb-4">
            Select Time - {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h4>
          
          {loading ? (
            <p className="text-gray-400">Loading available times...</p>
          ) : (
            <div className="space-y-6">
              {/* Duration Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Session Duration</label>
                <select
                  value={duration}
                  onChange={(e) => {
                    setDuration(Number(e.target.value));
                    setStartTime(""); // Reset start time when duration changes
                  }}
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white text-white"
                >
                  {durationOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Time Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Start Time</label>
                {availableStartTimes.length === 0 ? (
                  <div className="text-center py-8 bg-white/5 border border-white/20 rounded">
                    <p className="text-gray-400">No available time slots for this duration on this date.</p>
                    <p className="text-sm text-gray-500 mt-2">Try a shorter duration or choose a different day.</p>
                  </div>
                ) : (
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white text-white"
                  >
                    <option value="">Select start time</option>
                    {availableStartTimes.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Preview */}
              {startTime && endTime && (
                <div className="bg-white/5 border border-white/20 p-4">
                  <p className="text-sm text-gray-400 mb-2">Selected session:</p>
                  <p className="font-bold text-lg">
                    {startTime} - {endTime}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {duration >= 1 ? `${duration} hour${duration !== 1 ? 's' : ''}` : `${duration * 60} minutes`}
                  </p>
                  {!isAvailable && (
                    <p className="text-red-400 text-sm mt-2">
                      ⚠️ This time slot conflicts with existing bookings
                    </p>
                  )}
                </div>
              )}

              {/* Confirm Button */}
              {startTime && isAvailable && (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full py-3 font-bold transition bg-white text-black hover:bg-gray-200"
                >
                  Confirm {duration >= 1 ? `${duration} Hour` : `${duration * 60} Minute`} Session
                </button>
              )}

              <p className="text-sm text-gray-400">
                * Available times work around your existing calendar commitments.
                <br />
                * Sessions available from 10:00 AM to 11:30 PM in 30-minute increments.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
