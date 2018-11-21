import {SafetyState} from "./SafetyState";

export interface IScan {
	name: string;
	contrast: string;
	time: string;
	name2: string;
	name3: string;
	name4: string;
}

export const scanTypes: IScan[] = [
	{name: 'Hip MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Hip MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Knee MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Knee MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Ankle MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Ankle MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Calf MRI', contrast: 'without contrast', time: '45 min', name2: 'Tib-Fib MRI', name3: 'Tibia Fibula MRI', name4: ''},
	{name: 'Calf MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Tib-Fib MRI', name3: 'Tibia Fibula MRI', name4: ''},
	{name: 'Foot MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Foot MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Thigh MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Thigh MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Hand MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Hand MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Wrist MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Wrist MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Forearm MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Forearm MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Elbow MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Elbow MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Humerus MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Humerus MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Shoulder MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Shoulder MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Cervical spine MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Cervical spine MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Multiple sclerosis protocol', name3: '', name4: ''},
	{name: 'Thoracic spine MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Thoracic spine MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Multiple sclerosis protocol', name3: '', name4: ''},
	{name: 'Lumbar spine MRI', contrast: 'without contrast', time: '45 min', name2: 'Low back pain MRI', name3: '', name4: ''},
	{name: 'Lumbar spine MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Brain MRI', contrast: 'without contrast', time: '45 min', name2: 'Memory loss MRI', name3: 'Concussion evaluation MRI', name4: ''},
	{name: 'Brain MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Pituitary (Brain MRI)', contrast: 'with and without contrast', time: '45 min', name2: 'Pituitary protocol MRI', name3: '', name4: ''},
	{name: 'Brain MRA', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Neck MRA', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Neck (soft tissues) MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Soft tissue neck MRI', name3: 'Neck mass MRI', name4: ''},
	{name: 'Chest MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Chest MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Abdomen MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Abdomen MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Liver lesion MRI', name3: 'Kidney lesion MRI', name4: 'Adrenal lesion MRI'},
	{name: 'MRCP', contrast: 'without contrast', time: '45 min', name2: 'Biliary MRI', name3: 'MR Cholangiogram', name4: ''},
	{name: 'Breast implant MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Pelvic (bony) MRI', contrast: 'without contrast', time: '45 min', name2: 'Sacrum MRI', name3: 'SI joint MRI', name4: ''},
	{name: 'Pelvic (bony) MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Pelvic (prostate) MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Prostate MRI', name3: '', name4: ''},
	{name: 'Pelvic (rectum) MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Rectal MRI', name3: '', name4: ''},
	{name: 'Pelvic (female) MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Female pelvis MRI', name3: 'Uterus MRI', name4: ''},
	{name: 'MR Enterography', contrast: 'with and without contrast', time: '90 min', name2: 'Crohns protocol MRI', name3: '', name4: ''},
];

export interface IScanTypeState {
	mriName: string;
	matches: {name, contrast, time, name2, name3}[];
	oops: string|null;
	haveOrder: boolean;
	safetyState: SafetyState;
}
