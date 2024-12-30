'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { DateRange } from 'react-day-picker';

type ReservationContextType = {
  range: DateRange;
  setRange: Dispatch<SetStateAction<DateRange>>;
  resetRange: () => void;
};

const ReservationContext = createContext({} as ReservationContextType);

export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  function resetRange() {
    setRange({ from: undefined, to: undefined });
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined) {
    throw new Error('Reservation Context was used outside provider');
  }
  return context;
}
