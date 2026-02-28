"use client";

import { useState, useEffect } from "react";

interface BookingCalendarProps {
  onSelectSlots: (date: string, times: string[]) => void;
}

export default function BookingCalendar({ onSelectSlots }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Generate all time slots (10am - 11pm in 1-hour increments for display)
  const generateDisplaySlots = (): string[] => {
    const slots = [];
    for (let hour = 10; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const displaySlots = generateDisplaySlots();

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
    setStartTime("");
    setEndTime("");
  }, [selectedDate]);

  // Check if a specific hour slot is booked (checks all 30-min slots within that hour)
  const isSlotBooked = (hourSlot: string): boolean => {
    const hour = parseInt(hourSlot.split(':')[0]);
    const slot1 = `${hour.toString().padStart(2, '0')}:00`;
    const slot2 = `${hour.toString().padStart(2, '0')}:30`;
    return bookedSlots.includes(slot1) || bookedSlots.includes(slot2);
  };

  // Check if a time range is available (2 hour minimum)
  const isRangeAvailable = (start: string, end: string): boolean => {
    if (!start || !end) return false;

    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    
    // Must be at least 2 hours
    if (endHour - startHour < 2) return false;

    // Check all 30-min slots in the range
    for (let hour = startHour; hour < endHour; hour++) {
      const slot1 = `${hour.toString().padStart(2, '0')}:00`;
      const slot2 = `${hour.toString().padStart(2, '0')}:30`;
      if (bookedSlots.includes(slot1) || bookedSlots.includes(slot2)) {
        return false;
      }
    }

    return true;
  };

  // Get valid end times for selected start time
  const getValidEndTimes = (start: string): string[] => {
    if (!start) return [];
    
    const startHour = parseInt(start.split(':')[0]);
    const validEnds: string[] = [];

    // Check each possible end time (minimum 2 hours after start)
    for (let endHour = startHour + 2; endHour <= 23; endHour++) {
      const endSlot = `${endHour.toString().padStart(2, '0')}:00`;
      if (isRangeAvailable(start, endSlot)) {
        validEnds.push(endSlot);
      } else {
        // If this slot is blocked, no point checking further
        break;
      }
    }

    return validEnds;
  };

  const handleSlotClick = (slot: string) => {
    if (isSlotBooked(slot)) return; // Can't click booked slots

    if (!startTime) {
      // First click: set start time
      setStartTime(slot);
      setEndTime("");
    } else if (startTime && !endTime) {
      // Second click: set end time
      const slotHour = parseInt(slot.split(':')[0]);
      const startHour = parseInt(startTime.split(':')[0]);

      // Check if it's a valid end time
      if (slotHour > startHour && isRangeAvailable(startTime, slot)) {
        setEndTime(slot);
      } else {
        // Invalid selection, reset and set as new start
        setStartTime(slot);
        setEndTime("");
      }
    } else {
      // Third click: reset and start over
      setStartTime(slot);
      setEndTime("");
    }
  };

  const handleConfirm = () => {
    if (!selectedDate || !startTime || !endTime) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    
    // Generate all 30-min slots in the range
    const slots: string[] = [];
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    onSelectSlots(dateStr, slots);
  };

  const clearSelection = () => {
    setStartTime("");
    setEndTime("");
  };

  // Calculate duration and price
  const getDuration = (): number => {
    if (!startTime || !endTime) return 0;
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    return endHour - startHour;
  };

  const getPrice = (): number => {
    return getDuration() * 35; // £35/hour
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
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return false;
    
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (date > maxDate) return false;
    
    return true;
  };

  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date)) return;
    setSelectedDate(date);
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
  const validEndTimes = startTime ? getValidEndTimes(startTime) : [];

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
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-400 pb-2">
            {day}
          </div>
        ))}
        
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

      {/* Timeline Selection */}
      {selectedDate && (
        <div className="mt-8 pt-8 border-t border-white/20">
          <h4 className="text-xl font-bold mb-2">
            {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h4>
          
          {!startTime && (
            <p className="text-gray-400 mb-6 text-sm">
              Click a start time (green = available, red = booked)
            </p>
          )}
          
          {startTime && !endTime && (
            <p className="text-gray-400 mb-6 text-sm">
              Now click an end time (minimum 2 hours from {startTime})
            </p>
          )}

          {loading ? (
            <p className="text-gray-400">Loading availability...</p>
          ) : (
            <>
              {/* Desktop: Horizontal Timeline */}
              <div className="hidden md:block mb-6">
                <div className="flex gap-1 overflow-x-auto pb-2">
                  {displaySlots.map((slot) => {
                    const isBooked = isSlotBooked(slot);
                    const isStart = slot === startTime;
                    const isEnd = slot === endTime;
                    const slotHour = parseInt(slot.split(':')[0]);
                    const startHour = startTime ? parseInt(startTime.split(':')[0]) : 0;
                    const endHour = endTime ? parseInt(endTime.split(':')[0]) : 0;
                    const isInRange = startTime && endTime && slotHour > startHour && slotHour < endHour;
                    const isValidEnd = startTime && !endTime && validEndTimes.includes(slot);
                    
                    let bgColor = 'bg-red-500/30'; // Booked (default)
                    let hoverColor = '';
                    let cursor = 'cursor-not-allowed';
                    let border = 'border border-white/10';
                    
                    if (!isBooked) {
                      if (isStart || isEnd) {
                        bgColor = 'bg-blue-500';
                        border = 'border-2 border-white';
                      } else if (isInRange) {
                        bgColor = 'bg-blue-400';
                      } else if (isValidEnd) {
                        bgColor = 'bg-blue-300';
                        hoverColor = 'hover:bg-blue-400';
                        cursor = 'cursor-pointer';
                      } else if (!startTime) {
                        bgColor = 'bg-green-500';
                        hoverColor = 'hover:bg-green-600';
                        cursor = 'cursor-pointer';
                      } else {
                        bgColor = 'bg-gray-600';
                      }
                    }
                    
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSlotClick(slot)}
                        disabled={isBooked}
                        className={`
                          flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center
                          ${bgColor} ${hoverColor} ${cursor} ${border}
                          transition-all text-sm font-medium
                        `}
                      >
                        <div className="text-xs opacity-70">
                          {slot.split(':')[0] >= 12 ? 'PM' : 'AM'}
                        </div>
                        <div className="font-bold">
                          {parseInt(slot.split(':')[0]) > 12 
                            ? (parseInt(slot.split(':')[0]) - 12).toString() 
                            : slot.split(':')[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: Vertical List */}
              <div className="md:hidden space-y-2 mb-6">
                {displaySlots.map((slot) => {
                  const isBooked = isSlotBooked(slot);
                  const isStart = slot === startTime;
                  const isEnd = slot === endTime;
                  const slotHour = parseInt(slot.split(':')[0]);
                  const startHour = startTime ? parseInt(startTime.split(':')[0]) : 0;
                  const endHour = endTime ? parseInt(endTime.split(':')[0]) : 0;
                  const isInRange = startTime && endTime && slotHour > startHour && slotHour < endHour;
                  const isValidEnd = startTime && !endTime && validEndTimes.includes(slot);
                  
                  let bgColor = 'bg-red-500/30';
                  let textColor = 'text-white/50';
                  let status = 'Booked';
                  let cursor = 'cursor-not-allowed';
                  
                  if (!isBooked) {
                    if (isStart) {
                      bgColor = 'bg-blue-500';
                      textColor = 'text-white';
                      status = 'START';
                    } else if (isEnd) {
                      bgColor = 'bg-blue-500';
                      textColor = 'text-white';
                      status = 'END';
                    } else if (isInRange) {
                      bgColor = 'bg-blue-400';
                      textColor = 'text-white';
                      status = 'Selected';
                    } else if (isValidEnd) {
                      bgColor = 'bg-blue-300 hover:bg-blue-400';
                      textColor = 'text-white';
                      status = 'Tap to select end';
                      cursor = 'cursor-pointer';
                    } else if (!startTime) {
                      bgColor = 'bg-green-500 hover:bg-green-600';
                      textColor = 'text-white';
                      status = 'Available';
                      cursor = 'cursor-pointer';
                    } else {
                      bgColor = 'bg-gray-600';
                      textColor = 'text-white/50';
                      status = 'Not selectable';
                    }
                  }
                  
                  const displayTime = parseInt(slot.split(':')[0]) > 12 
                    ? `${parseInt(slot.split(':')[0]) - 12}:00 PM`
                    : `${slot} ${parseInt(slot.split(':')[0]) >= 12 ? 'PM' : 'AM'}`;
                  
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSlotClick(slot)}
                      disabled={isBooked && !isStart && !isEnd}
                      className={`
                        w-full flex justify-between items-center p-4
                        ${bgColor} ${cursor} border border-white/10
                        transition-all
                      `}
                    >
                      <span className="font-bold">{displayTime}</span>
                      <span className={`text-sm ${textColor}`}>{status}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selection Preview */}
              {startTime && endTime && (
                <div className="bg-white/10 border border-white/20 p-6 mb-4">
                  <p className="text-sm text-gray-400 mb-2">Your selection:</p>
                  <p className="text-2xl font-bold mb-1">
                    {startTime} - {endTime}
                  </p>
                  <p className="text-lg text-gray-300 mb-3">
                    {getDuration()} hours • £{getPrice()}
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 transition font-semibold"
                    >
                      Change Selection
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="flex-1 px-4 py-2 bg-white text-black hover:bg-gray-200 transition font-semibold"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-400 mt-4">
                * Minimum booking: 2 hours
                <br />
                * Available times shown in green, booked times in red
                <br />
                * Click start time, then click end time
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
