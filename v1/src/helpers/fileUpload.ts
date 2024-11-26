import {BASE_PATH} from "../api/api";

export function uploadFile(files: File[], callback: (imageUri: string | null) => any) {
	const file = new FormData();
	for (let i = 0; i < files.length; ++i) {
		file.append(files[i].name || 'file', files[i]);
	}
	const req = new XMLHttpRequest();
	const url = BASE_PATH + '/upload';
	req.open('POST', url, true);
	req.onload = () => {
		if (req.status === 200) {
			callback(req.response);
		} else {
			callback(null);
		}
	};
	req.send(file);
}

