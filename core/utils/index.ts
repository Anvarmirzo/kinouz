import {AxiosError} from 'axios';
import {toast} from 'react-toastify';

export const formatNumber = (number: number = 0, currency: string, fixed: number = 2) => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: currency,
	}).format(Number(number?.toFixed(fixed)));
};

export class Toast {
	static options = {delay: 1};

	static info = (info: string) => {
		toast.info(info, this.options);
	};

	static success = (message: string) => {
		toast.success(message, this.options);
	};

	static error = (error: AxiosError<{message?: string} | undefined>) => {
		if (error.message !== 'canceled') {
			let message = error.response?.data?.message || error.message || 'Server Side Error';
			if (Array.isArray(message)) {
				message = message.join(', ');
			}
			toast.error(message, this.options);
		}
	};

	static warning = (warning: string) => {
		toast.warn(warning, this.options);
	};
}

export const formatData = (formdata: any) => {
	const postData = new FormData();
	const formatData: any = {
		...formdata,
	};

	Object.keys(formatData).forEach((key) => {
		if (![undefined, null, 'undefined'].includes(formatData[key])) {
			if (Array.isArray(formatData[key])) {
				formatData[key].forEach((data: any, i: number) => {
					postData.append(key, data);
				});

				return;
			}

			if (formatData[key] instanceof Object) {
				if (Object.keys(formatData[key]).length) {
					Object.keys(formatData[key]).forEach((key2) => {
						postData.append(`${key}[${key2}]`, formatData[key][key2]);
					});

					return;
				} else {
					postData.append(key, formatData[key]);
				}
			} else {
				postData.append(key, formatData[key]);
			}
		}
	});

	return postData;
};

export const imageUpload =
	(setPreview: (preview: any) => void, setFile: (file: File) => void) => (e: any) => {
		const file = e.target.files[0];
		setFile(file);

		const reader = new FileReader();

		reader.onload = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(file);
	};
