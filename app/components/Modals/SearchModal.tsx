'use client';

import React, {useCallback, useMemo, useState} from 'react';
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "@/app/components/Modals/Modal";
import {useRouter, useSearchParams} from "next/navigation";
import {Range} from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, {CountrySelectValue} from "@/app/components/Inputs/CountrySelect";
import qs from 'query-string';
import {formatISO} from "date-fns";
import Heading from "@/app/components/Heading";
import Calender from "@/app/components/Inputs/Calender";
import Counter from "@/app/components/Inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('@/app/components/Map'), {
        ssr: false,
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);

    }, [step, searchModal, location, router, roomCount, guestCount, bathroomCount, dateRange, onNext, params]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Search"
        }

        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where so you want to go" subtitle="Find the perfect location!"/>
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}/>
            <hr/>
            <Map center={location?.latlng}/>
        </div>
    )

    if(step === STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="When do you plan to go?"
                subtitle="Make sure everyone is free!"
                />
                <Calender
                value={dateRange}
                onChange={(value)=> setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(step == STEPS.INFO){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="More information"
                subtitle="Find your perfect place"
                />
               <Counter
                   title="Guests"
                   subtitle="How many guests are comming"
                   value={guestCount}
                   onChange={(value)=> setGuestCount(value)}
               />
                <hr/>
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value)=> setRoomCount( value)}
                />
                <hr/>
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value)=> setBathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            title="Filters"
            body={bodyContent}
        />
    );
};

export default SearchModal;