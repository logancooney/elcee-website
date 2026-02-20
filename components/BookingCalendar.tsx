"use client";

import { useState, useEffect } from "react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingCalendarProps {
  onSelectSlot: (date: string, time: string) => void;
}

export default function BookingCalendar({ onSelectSlot }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Studio hours: 10am - 10pm, 2-hour blocks
  const generateTimeSlots = (): string[] => {
    const slots = [];
    for (let hour = 10; hour <= 20; hour += 2) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      slots.push(timeStr);
    }
    return slots;
  };

  // Fetch available slots for selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`/api/availability?date=${dateStr}`);
        const data = await response.json();
        
        const allSlots = generateTimeSlots();
        const slots: TimeSlot[] = allSlots.map(time => ({
          time,
          available: !data.bookedSlots?.includes(time)
        }));
        
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
        // Default: all slots available
        const allSlots = generateTimeSlots();
        setAvailableSlots(allSlots.map(time => ({ time, available: true })));
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

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
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (!slot.available || !selectedDate) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    onSelectSlot(dateStr, slot.time);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={prevMonth}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 transition"
        >
          ←
        </button>
        <h3 className="text-2xl font-bold">{monthName}</h3>
        <button 
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

      {/* Time Slots */}
      {selectedDate && (
        <div className="mt-8 pt-8 border-t border-white/20">
          <h4 className="text-xl font-bold mb-4">
            Available Times - {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h4>
          
          {loading ? (
            <p className="text-gray-400">Loading available slots...</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => handleSlotClick(slot)}
                  disabled={!slot.available}
                  className={`
                    py-3 px-4 border transition font-semibold
                    ${slot.available 
                      ? 'border-white/40 hover:bg-white hover:text-black cursor-pointer' 
                      : 'border-white/10 opacity-30 cursor-not-allowed line-through'
                    }
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
          
          <p className="text-sm text-gray-400 mt-4">
            * Sessions are 2-hour blocks. Click a time to select your start time.
          </p>
        </div>
      )}
    </div>
  );
}
