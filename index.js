import { Linking, Platform } from 'react-native';
import isValidCoordinates from 'is-valid-coordinates';

const PLATFORM = Platform.OS;

export const OpenMapDirections = (startPoint = null, endPoint, transportType) => new Promise((resolve, reject) => {
	var _to;
	var _frm = _checkCoordParameter(startPoint) !== null ? `?saddr=${_checkCoordParameter(startPoint)}` : '';
	var _frm = _checkAddrParameter(startPoint) !== null ? `?saddr=${_checkCoordParameter(startPoint)}` : '';
	if (_checkCoordParameter(endPoint) !== null) {
		_to = (_frm.length == 0 ? '?' : '&') + `daddr=${_checkCoordParameter(endPoint)}`
	} 
	  else if (_checkAddrParameter(endPoint) !== null)  {
		  _to = (_frm.length == 0 ? '?' : '&') + `daddr=${_checkAddrParameter(endPoint)}`
	  }
	  else {
		throw new Error('You need to pass a valid endpoint(coordinate or address in Data URL format)')
	};
	const _transportType = _checkTransportParameter(transportType) !== null ? `&dirflg=${_checkTransportParameter(transportType)}` : '';
	const url = `${PLATFORM === 'ios' ? `https://maps.apple.com/` : 'https://maps.google.com/'}${_frm}${_to}${_transportType}`;
	_openApp(url).then(result => { resolve(result) });
});

const _openApp = (url) => new Promise((resolve, reject) => {
	Linking.canOpenURL(url)
		.then(res => {
			Linking.openURL(url)
				.then(result => {
					resolve('opening app....');
				}).catch(err => { reject('Cannot link app!!!'); })
		}).catch(err => {
			reject('Cannot open app!!!');
		})
});

const _checkCoordParameter = (param) => {
	if (param === null || param === undefined || typeof param.latitude === 'string' || typeof param.longitude === 'string') { return null; }

	if (isValidCoordinates.longitude(param.longitude) && isValidCoordinates.latitude(param.latitude)) {
		return `${param.latitude},${param.longitude}`
	}

	return null;
}

const _checkAddrParameter = (param) => {
	if (param === null || param === undefined || typeof param.Address !== 'string' || param.Address.includes(' ')  ) { return null; }

	if (typeof param.Address === 'string') {
		return `${param.Address}`
	}

	return null;
}

const _checkTransportParameter = (param) => {
	const _transportType = param.toLowerCase();
	if (_transportType === 'd' || _transportType === 'w' || _transportType === 'r' || _transportType === 'b') {
		return _transportType;
	}

	return 'w';
}
