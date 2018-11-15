import Dropzone from "react-dropzone";
import * as React from "react";
import {BASE_PATH} from "ucshared";
declare var $: any;

export function showImageOrPlaceholder(img: string | null) {
	if (typeof img !== 'string' || img === null || img.length < 1) {
		return <div>Click here to select picture/PDF</div>;
	}
	return (
		<img alt="Uploaded image" src={img} className="img-fluid" style={{maxHeight: '100px', maxWidth: '100%'}}/>
	);
}

export class FileUpload extends React.Component<{bucket: string, url: string, onNewUrl: (url: string)=>any}, {isLoading: boolean}> {
	constructor(props, context) {
		super(props, context);
		this.state = {isLoading: false};
	}
	public render() {
		return (
			<Dropzone
				accept="image/*"
				className="button green small w-button"
				onDrop={(files) => this.onDrop(this.props.bucket, files)}
			>{showImageOrPlaceholder(this.props.url)}
			</Dropzone>
		);
	}

	private onDrop(bucket: string, files: File[]) {
		const fd = new FormData();
		fd.append('file', files[0]);

		$.ajax({
			url: BASE_PATH + '/api/upload/?to=' + bucket,
			type: 'POST',
			enctype: 'multipart/form-data',
			processData: false,  // Important!
			cacheData: false,
			contentType: false,
			data: fd,
		}).then(
			(data: any, textStatus: string, jqXhr: any) => {
				console.log(textStatus, data);
				this.setState({
					isLoading: false,
					uploadedUri: data,
				} as any, () => {
					if (this.props.onNewUrl) {
						this.props.onNewUrl(data);
					}
				});
			},
			(error) => {
				console.log(error);
			},
		);
	}
}
