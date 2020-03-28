import { qualificameApiAxios, qualificameAuthAxios } from "qualificame-native/app/utils/Axios";

export default {
	// Login
	async login ({username, password}) {
		const method = 'POST';
		const url = `/oauth/token`;
		let data = {
			username,
			password,
			grant_type: 'password',
			scope: 'admin'
		}
		return this.makeRequest({ method, url, data });
	},

	//ChangePassword

	changePassword(current_password, password, password_confirmation){
		const method = 'PUT';
		const url = `/api/user`
		let data = {
			user: {
				current_password, password, password_confirmation
			}
		}
		return this.makeAuthorizedRequest({method, url, data})

	},

	getNewToken ( refresh_token ) {
		const url = `/oauth/token`;
		const method = 'POST';
		const data = {
			grant_type: 'refresh_token',
			refresh_token
		};
		return this.makeRequest({ method, url, data });
	},
	
	getUser() {
		const method = 'GET';
		const url = '/api/me';
		return this.makeAuthorizedRequest({method, url})
	},

	createUser({email, password, first_name, last_name, company_name}={}){
		const method = 'POST';
		const url = '/auth/signup';
		const data = {
			user: {
				email,
				password,
				first_name,
				last_name,
				company_name,
			}
		}
		return this.makeRequest({method, url, data})
	},

	async registerDevice(token) {
		const url = '/api/mobile_devices';
		const method = 'POST';
		const data = {
			mobile_device: { expo_token: token }
		}
		return this.makeAuthorizedRequest({ method, url, data });
	},

	//Alerts
	getAlerts ({limit=25, offset=0}) {
		const method = 'GET';
		const url = '/api/alerts'
		let params = { 
			limit,
			offset,
			sort_by: 'created_at:DESC'
		}
		return this.makeAuthorizedRequest({method, url, params});
	},

	updateAlert({alert}) {
		const method = 'PUT';
		const url = `/api/alerts/${alert.id}`;
		const data = {
			alert
		}

		return this.makeAuthorizedRequest({ method, url, data })
	},

	// Events
	getEvents ({limit=25, offset=0, start_date, end_date}={}) {
		const method = 'GET';
		const url = '/api/events';
		let params = {
			limit: `${limit}`,
			offset: `${offset}`,
			filters: `start_date=${start_date};end_date=${end_date}`,
			sort_by: 'created_at:DESC'
		}
		return this.makeAuthorizedRequest({ method, url, params});
	},

	//Kiosks
	getKiosks () {
		const method = 'GET';
		const url = '/api/kiosks';
		return this.makeAuthorizedRequest({ method, url });
	},

	createKiosk ({name, phone, email, address}={}) {
		const method = 'POST';
		const url = '/api/kiosks';
		const data = {
			kiosk: {
				name,
				phone,
				email,
				address,
				max_negative_percent: 75,
				min_positive_percent: 75,
				max_negative_events: 100,
				min_positive_events: 100,
			}
		}
		return this.makeAuthorizedRequest({ method, url, data });
	},

	updateKiosk({kiosk}) {
		const method = 'PUT';
		const url = `/api/kiosks/${kiosk.id}`;
		const data = {
			kiosk
		}

		return this.makeAuthorizedRequest({ method, url, data })
	},

	deleteKiosk (kiosk_id) {
		const method = 'DELETE';
		const url = `/api/kiosks/${kiosk_id}`
		return this.makeAuthorizedRequest({ method, url });
	},
	activateKiosk(params) {
		const method = 'PUT';
		const url = 'https://qualificame.dev.kioru.com/api/register_kiosk';
		const data = {
			kiosk_device: { 
				token: params.token,
				kiosk_id: params.id
			}
		}
		return this.makeAuthorizedRequest({ method, url, data });
	},

	//Reports
	getReports() {
		const method = 'GET';
		const url = '/api/reports';
		const params = {
			include_fields: 'kiosk_name'
		}
		return this.makeAuthorizedRequest({ method, url , params});
	},

	createReport(kiosk_id, start_datetime, end_datetime) {
		const method = 'POST';
		const url = '/api/reports';
		const data = {
			report:{
				kiosk_id,
				start_datetime,
				end_datetime,
			}
		}
		const params = {
			include_fields: 'kiosk_name'
		}
		return this.makeAuthorizedRequest({ method, url, data, params });
	},

	deleteReport(report_id) {
		const method = 'DELETE';
		const url = `/api/reports/${report_id}`;
		return this.makeAuthorizedRequest({ method, url });
	},

	// Questions
	getKioskQuestions(kiosk_id) {
		const method = 'GET';
		// filters is not yet implemented
		let params = this.makeQueryParams({
			filters: `kiosk_id=${kiosk_id}`
		})
		const url = `/api/questions?${params}`;

		return this.makeAuthorizedRequest({ method, url });
	},
	createQuestion({ questionType, description, kioskId }) {
		const method = 'POST';
		const url = `/api/questions`;
		const data = {
			question: {
				question_type: questionType,
				kiosk_id: kioskId,
				description
			}
		}

		return this.makeAuthorizedRequest({ method, url, data})
	},
	updateQuestion({ id, description }) {
		const method = 'PUT';
		const url = `/api/questions/${id}`;
		const data = {
			question: {
				description
			}
		}

		return this.makeAuthorizedRequest({ method, url, data });

	},

	// Choices
	getQuestionChoices(question_id, params) {
		const method = 'GET';
		let queryParams = this.makeQueryParams({
			...params
		})
		const url = `/api/questions/${question_id}/choices?${queryParams}`;

		return this.makeAuthorizedRequest({ method, url });
	},
	createQuestionChoice(description, questionId) {
		const method = 'POST';
		const url = `/api/questions/${questionId}/choices`;
		const data = {
			choice: {
				description
			}
		}

		return this.makeAuthorizedRequest({ method, url, data})
	},
	updateChoice(id, active) {
		const method = 'PUT';
		const url = `/api/choices/${id}`;
		const data = {
			choice: {
				active
			}
		}

		return this.makeAuthorizedRequest({ method, url, data })
	},

	makeQueryParams (params) {
		let queries = '';
		for(var key in params){
			queries += `${key}=${params[key]}&`;
		}
		return queries;
	},

	async makeRequest ( requestData={} ) {
		let res = await qualificameAuthAxios(requestData);
		return res.data;
	},

	async makeAuthorizedRequest ( requestData={} ) {
		try {
			let res = await qualificameApiAxios(requestData);
			return res.data;
		} catch (error) {
			let status = error.response ? error.response.status : 0;
			throw error;
			// if ( status === 401 ) {
			// 	await this.suscribeForRefreshAuth();
			// 	let retryResult = await this.makeAuthorizedRequest(requestData);
			// 	return retryResult;
			// } else {
			// 	throw error;
			// }
		}
	},

};

