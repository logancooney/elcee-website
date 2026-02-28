"use client";

import { useState, useEffect } from "react";

interface BookingCalendarProps {
  onSelectSlots: (date: string, times: string[]) => void;
}

export default function BookingCalendar({ onSelectSlots }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Fetch available slots for selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`/api/availability?date=${dateStr}`);
        const data = await response.json();
        
        // All possible 2-hour slots (10am-10pm)
        const allSlots = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
        
        // Filter to only available slots (not in bookedSlots)
        const available = allSlots.filter(slot => !data.bookedSlots?.includes(slot));
        
        setAvailableSlots(available);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
    setSelectedSlot("");
  }, [selectedDate]);

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    
    // Generate 30-min slots for the 2-hour block
    const hour = parseInt(selectedSlot.split(':')[0]);
    const slots = [
      `${hour.toString().padStart(2, '0')}:00`,
      `${hour.toString().padStart(2, '0')}:30`,
      `${(hour + 1).toString().padStart(2, '0')}:00`,
      `${(hour + 1).toString().padStart(2, '0')}:30`,
    ];
    
    onSelectSlots(dateStr, slots);
  };

  // Calendar generation
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

  const formatTimeRange = (slot: string) => {
    const hour = parseInt(slot.split(':')[0]);
    const endHour = hour + 2;
    
    const formatHour = (h: number) => {
      if (h === 12) return '12:00 PM';
      if (h > 12) return `${h - 12}:00 PM`;
      return `${h}:00 AM`;
    };
    
    return `${formatHour(hour)} - ${formatHour(endHour)}`;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full">
      {/* Step indicator */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className={`flex items-center gap-2 ${selectedDate ? 'text-white' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedDate ? 'bg-white text-black' : 'bg-white/20'}`}>
              1
            </span>
            <span>Pick a date</span>
          </div>
          <span className="text-gray-600">→</span>
          <div className={`flex items-center gap-2 ${selectedSlot ? 'text-white' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedSlot ? 'bg-white text-black' : 'bg-white/20'}`}>
              2
            </span>
            <span>Pick a time</span>
          </div>
        </div>
      </div>

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
                aspect-square flex items-center justify-center border transition text-sm
                ${available ? 'hover:bg-white hover:text-black cursor-pointer' : 'opacity-30 cursor-not-allowed'}
                ${isSelected ? 'bg-white text-black font-bold border-white' : 'border-white/20'}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Available Time Slots */}
      {selectedDate && (
        <div className="mt-8 pt-8 border-t border-white/20">
          <h4 className="text-xl font-bold mb-4">
            Available times on {selectedDate.toLocaleDateString('en-GB', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </h4>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Checking availability...</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="text-center py-8 bg-white/5 border border-white/10 rounded">
              <p className="text-gray-400 mb-2">No availability on this date</p>
              <p className="text-sm text-gray-500">Please choose a different day</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {availableSlots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`
                        w-full p-4 text-left border transition
                        ${isSelected 
                          ? 'bg-white text-black border-white font-semibold' 
                          : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                        }
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg">{formatTimeRange(slot)}</span>
                        <span className="text-sm opacity-70">2 hours</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedSlot && (
                <div className="bg-white/10 border border-white/20 p-6">
                  <p className="text-sm text-gray-400 mb-2">Your selection:</p>
                  <p className="text-xl font-bold mb-1">
                    {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <p className="text-lg text-gray-300 mb-4">
                    {formatTimeRange(selectedSlot)} (2 hours • £70)
                  </p>
                  
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="w-full py-3 bg-white text-black hover:bg-gray-200 transition font-semibold"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}

              <p className="text-sm text-gray-400 mt-6">
                * All times shown are available for booking
                <br />
                * Times automatically account for your schedule + 1-hour travel buffer
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
