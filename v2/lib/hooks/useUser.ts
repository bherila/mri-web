'use client'
import { useState, useEffect } from 'react';

type User = typeof defaultValues;

const defaultValues = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  answers: {},
  implants: [],
  currentImplant: '',
  haveOrder: false,
  scan: null,
  overrideSafetyWarning: false,
  height: '',
  weight: '',
  doctorName: '',
  doctorContact: '',
  insFront: '',
  insBack: '',
  mriOrder: '',
  carrierNumber: '',
  groupNumber: '',
  policyNumber: '',
  timeSlot: null,
  err: '',
  dob: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  optedIn: true,
  validationResult: [],
};

const useSessionStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const getObject = (): T => value;

  const getValueByObjectKey = <K extends keyof T>(objectKey: K): T[K] => value[objectKey];

  const setObject = (newValue: T) => setValue(newValue);

  const setValueByObjectKey = <K extends keyof T>(objectKey: K, newValue: T[K]) =>
    setValue((prevValue: T) => ({ ...prevValue, [objectKey]: newValue }));

  return { getObject, getValueByObjectKey, setObject, setValueByObjectKey };
};

const useUser = () => useSessionStorage('user', defaultValues);

export default useUser;