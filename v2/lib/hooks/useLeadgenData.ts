import { useState, useEffect } from 'react';

interface LeadgenData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  answers: object;
  implants: string[];
  currentImplant: string;
  haveOrder: boolean;
  scan: null | any;
  overrideSafetyWarning: boolean;
  height: string;
  weight: string;
  doctorName: string;
  doctorContact: string;
  insFront: string;
  insBack: string;
  mriOrder: string;
  carrierNumber: string;
  groupNumber: string;
  policyNumber: string;
  timeSlot: null | any;
  err: string;
  dob: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  optedIn: boolean;
  validationResult: string[];
}

const defaultLeadgenData: LeadgenData = {
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

const useLeadgenData = () => {
  const [data, setData] = useState(() => {
    const storedData = sessionStorage.getItem('leadgenData');
    return storedData ? JSON.parse(storedData) : defaultLeadgenData;
  });

  useEffect(() => {
    sessionStorage.setItem('leadgenData', JSON.stringify(data));
  }, [data]);

  const fname = data.fname;
  const setFname = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, fname: value }));

  const lname = data.lname;
  const setLname = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, lname: value }));

  const email = data.email;
  const setEmail = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, email: email }));

  const phone = data.phone;
  const setPhone = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, phone: value }));

  const answers = data.answers;
  const setAnswers = (value: object) => setData((prevData: LeadgenData) => ({ ...prevData, answers: value }));

  const implants = data.implants;
  const setImplants = (value: string[]) => setData((prevData: LeadgenData) => ({ ...prevData, implants: value }));

  const currentImplant = data.currentImplant;
  const setCurrentImplant = (value: string) =>
    setData((prevData: LeadgenData) => ({ ...prevData, currentImplant: value }));

  const haveOrder = data.haveOrder;
  const setHaveOrder = (value: boolean) =>
    setData((prevData: LeadgenData) => ({ ...prevData, haveOrder: value }));

  const scan = data.scan;
  const setScan = (value: null | any) => setData((prevData: LeadgenData) => ({ ...prevData, scan: value }));

  const overrideSafetyWarning = data.overrideSafetyWarning;
  const setOverrideSafetyWarning = (value: boolean) =>
    setData((prevData: LeadgenData) => ({ ...prevData, overrideSafetyWarning: value }));

  const height = data.height;
  const setHeight = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, height: value }));

  const weight = data.weight;
  const setWeight = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, weight: value }));

  const doctorName = data.doctorName;
  const setDoctorName = (value: string) =>
    setData((prevData: LeadgenData) => ({ ...prevData, doctorName: value }));

  const doctorContact = data.doctorContact;
  const setDoctorContact = (value: string) =>
    setData((prevData: LeadgenData) => ({ ...prevData, doctorContact: value }));

  const insFront = data.insFront;
  const setInsFront = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, insFront: value }));

  const insBack = data.insBack;
  const setInsBack = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, insBack: value }));

  const mriOrder = data.mriOrder;
  const setMriOrder = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, mriOrder: value }));

  const carrierNumber = data.carrierNumber;
  const setCarrierNumber = (value: string) =>
    setData((prevData: LeadgenData) => ({ ...prevData, carrierNumber: value }));

  const groupNumber = data.groupNumber;
  const setGroupNumber = (value: string) =>
    setData((prevData: LeadgenData) => ({ ...prevData, groupNumber: value }));

  const policyNumber = data.policyNumber;
  const setPolicyNumber = (value: string) =>
    setData((prevData: LeadgenData) => ({ ...prevData, policyNumber: value }));

  const timeSlot = data.timeSlot;
  const setTimeSlot = (value: null | any) =>
    setData((prevData: LeadgenData) => ({ ...prevData, timeSlot: value }));

  const err = data.err;
  const setErr = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, err: value }));

  const dob = data.dob;
  const setDob = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, dob: value }));

  const address1 = data.address1;
  const setAddress1 = (value: string) =>
    setData((prevData: LeadgenData) => ({ ...prevData, address1: value }));

  const address2 = data.address2;
  const setAddress2 = (value: string) =>
    setData((prevData: LeadgenData) => ({ ...prevData, address2: value }));

  const city = data.city;
  const setCity = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, city: value }));

  const state = data.state;
  const setState = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, state: value }));

  const zip = data.zip;
  const setZip = (value: string) => setData((prevData: LeadgenData) => ({ ...prevData, zip: value }));

  const optedIn = data.optedIn;
  const setOptedIn = (value: boolean) =>
    setData((prevData: LeadgenData) => ({ ...prevData, optedIn: value }));

  const validationResult = data.validationResult;
  const setValidationResult = (value: string[]) =>
    setData((prevData: LeadgenData) => ({ ...prevData, validationResult: value }));

  return {
    fname,
    setFname,
    lname,
    setLname,
    email,
    setEmail,
    phone,
    setPhone,
    answers,
    setAnswers,
    implants,
    setImplants,
    currentImplant,
    setCurrentImplant,
    haveOrder,
    setHaveOrder,
    scan,
    setScan,
    overrideSafetyWarning,
    setOverrideSafetyWarning,
    height,
    setHeight,
    weight,
    setWeight,
    doctorName,
    setDoctorName,
    doctorContact,
    setDoctorContact,
    insFront,
    setInsFront,
    insBack,
    setInsBack,
    mriOrder,
    setMriOrder,
    carrierNumber,
    setCarrierNumber,
    groupNumber,
    setGroupNumber,
    policyNumber,
    setPolicyNumber,
    timeSlot,
    setTimeSlot,
    err,
    setErr,
    dob,
    setDob,
    address1,
    setAddress1,
    address2,
    setAddress2,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    optedIn,
    setOptedIn,
    validationResult,
    setValidationResult,
  };
};

export default useLeadgenData;