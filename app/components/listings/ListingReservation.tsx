'use client'

import React from 'react';

interface ListingReservationProps{
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate:(value: Range) => void;
    onSubmit: ()=> void;
    disabled?: boolean;
    disabledDates: Date[]

}
const ListingReservation: React.FC<ListingReservationProps> = ({}) => {
    return (
        <div>

        </div>
    );
};

export default ListingReservation;