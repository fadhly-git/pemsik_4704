import { toast } from "react-hot-toast";

const defaultOptions = {
	duration: 3500,
	position: "top-right",
	style: {
		borderRadius: "8px",
		padding: "8px 12px",
		fontWeight: 500,
	},
};

export const toastSuccess = (message, opts = {}) =>
	toast.success(message, { ...defaultOptions, ...opts });

export const toastError = (message, opts = {}) =>
	toast.error(message, { ...defaultOptions, ...opts });

export const toastInfo = (message, opts = {}) =>
	toast(message, { ...defaultOptions, ...opts });

// Helper untuk menampilkan toast berdasarkan Promise (loading -> success / error)
export const toastPromise = (promise, messages, opts = {}) =>
	toast.promise(promise, messages, { ...defaultOptions, ...opts });

export const toastRaw = (message, opts = {}) =>
	toast(message, { ...defaultOptions, ...opts });

export default {
	success: toastSuccess,
	error: toastError,
	info: toastInfo,
	promise: toastPromise,
	raw: toastRaw,
};