import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	Keyboard,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';

import styles from './CreateReportScreenStyle';
import { Colors } from 'qualificame-native/app/styles';

import HugeText from 'qualificame-native/app/components/HugeText';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import BodyText from 'qualificame-native/app/components/BodyText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import BorderedInput from 'qualificame-native/app/components/BorderedInput';
import ShowAlert from 'qualificame-native/app/components/ShowAlert';

import GetKiosksContainer from 'qualificame-native/app/containers/GetKiosksContainer';

import moment from 'moment';
import ActionSheet from 'react-native-actionsheet'
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class CreateReportScreen extends Component {	
	static navigationOptions = {
		header: null
	}

	state = {
		showAlert: false,
		alertHead: '',
		alertBody: '',
		kiosks: [],
		selectedKiosk: "",
		isDatePickerVisible: false,
		isTimePickerVisible: false,
		dateStart: false,
		dateEnd: false,
		timeStart: false,
		timeEnd: false,
		fromStartDate: "",
		fromStartTime: "",
		fromEndDate: "",
		fromEndTime: "",
	}

	showPicker = (mode, picker) => {
		Keyboard.dismiss();
		if(mode === 'date'){
    		this.setState({ isDatePickerVisible: true });
    		if(picker === 'dateStart') {
    			this.setState({dateStart: true})
    		}
    		else {
    			this.setState({dateEnd: true})
    		}
		}
    	else {
    		this.setState({ isTimePickerVisible: true });
    		if(picker === 'timeStart') {
    			this.setState({timeStart: true})
    		}
    		else {
    			this.setState({timeEnd: true})
    		}
    	}
  	}
	

	handleDatePicked = date => {
		if(this.state.dateStart) {
			if(this.state.fromEndDate) {
				if(moment(date).format('D-MMM-YYYY') === moment(this.state.fromEndDate).format('D-MMM-YYYY')){
					if(this.state.fromStartTime < this.state.fromEndTime){
						this.setState({fromStartDate: date})
					} else {
						this.setState({
							showAlert: true,
							alertHead: 'Fecha inválida',
							alertBody: 'No puedes seleccionar una fecha de inicio mayor a la fecha de terminación'
						});
					}
				} 
				else {
					if(date <= this.state.fromEndDate) {
						this.setState({fromStartDate: date})
					} else {
						this.setState({
							showAlert: true,
							alertHead: 'Fecha inválida',
							alertBody: 'No puedes seleccionar una fecha de inicio mayor a la fecha de terminación'
						});
					}//Alert.alert('Fecha inválida', 'No puedes seleccionar una fecha de inicio mayor a la fecha de terminación')
				}
			} 
			else this.setState({fromStartDate: date})
		}
		else {
			if(this.state.fromEndTime){
				if(this.state.fromEndTime < this.state.fromStartTime && moment(date).format('D-MMM-YYYY') === moment(this.state.fromStartDate).format('D-MMM-YYYY'))
					this.setState({
						showAlert: true,
						alertHead: 'Fecha inválida',
						alertBody: 'La hora de inicio es mayor a la hora de terminación'
					});
				else {
					let fromEndDate = moment(date).format().split('T');
					let fromEndTime = moment(this.state.fromEndTime).format().split('T');
					let finalDate = fromEndDate[0].concat('T').concat(fromEndTime[1]);

					if(finalDate > moment().format()){
						this.setState({
							showAlert: true,
							alertHead: 'Fecha inválida',
							alertBody: 'No se puede crear el reporte con una fecha y hora mayor a la actual'
						});
					} else {
						this.setState({fromEndDate: date})
					}
				}
				//Alert.alert('Fecha inválida', 'La hora de inicio es mayor a la hora de terminación')
			} else {
				if(this.state.fromStartDate <= date) {
					this.setState({fromEndDate: date})
				} else{
					this.setState({
						showAlert: true,
						alertHead: 'Fecha inválida',
						alertBody: 'No puedes seleccionar una fecha de terminación menor a la fecha de inicio'
					});
				} //Alert.alert('Fecha inválida', 'No puedes seleccionar una fecha de terminación menor a la fecha de inicio')
			}
		}
		this.hideDateTimePicker();
	}
	
	handleTimePicked = date => {
		if(this.state.timeStart) {
			if(this.state.fromEndTime){
				if(date < this.state.fromEndTime && this.state.fromStartDate && this.state.fromEndDate) {
					this.setState({fromStartTime: date})
				} else {
					this.setState({
						showAlert: true,
						alertHead: 'Hora inválida',
						alertBody: 'No puedes seleccionar una hora de inicio mayor a la hora de terminación'
					});
					//Alert.alert('Hora inválida', 'No puedes seleccionar una hora de inicio mayor a la hora de terminación')
				}
			} else{
				this.setState({fromStartTime: date})
			}
		}
		else {
			if(moment(this.state.fromStartDate).format('D-MMM-YYYY') === moment(this.state.fromEndDate).format('D-MMM-YYYY')){
				if(this.state.fromStartTime < date){
					let fromStartDate = moment(this.state.fromStartDate).format().split('T');
					let fromEndTime = moment(date).format().split('T');
					let finalDate = fromStartDate[0].concat('T').concat(fromEndTime[1]);
						
					if(finalDate > moment().format()){
						this.setState({
							showAlert: true,
							alertHead: 'Hora inválida',
							alertBody: 'No se puede crear un reporte con una fecha y hora mayor a la actual'
						});
					} else {
						this.setState({fromEndTime: date})
					}
				} else {
					this.setState({
						showAlert: true,
						alertHead: 'Hora inválida',
						alertBody: 'No puedes seleccionar una hora de terminación menor a la hora de inicio'
					});
					//Alert.alert('Hora inválida', 'No puedes seleccionar una hora de terminación menor a la hora de inicio')
				}
			} else {
				let fromEndDate = moment(this.state.fromEndDate).format().split('T');
				let fromEndTime = moment(date).format().split('T');
				let finalDate = fromEndDate[0].concat('T').concat(fromEndTime[1]);
					
				if(finalDate > moment().format()){
					this.setState({
						showAlert: true,
						alertHead: 'Hora inválida',
						alertBody: 'No se puede crear un reporte con una fecha y hora mayor a la actual'
					});
				} else {
					this.setState({fromEndTime: date})
				}
			}

		} 
		this.hideDateTimePicker();
	}

	hideDateTimePicker = () => {
		this.setState({
			isDatePickerVisible: false, 
			isTimePickerVisible: false,
			dateStart: false,
			dateEnd: false,
			timeStart: false,
			timeEnd: false,
		});
	}

	showActionShet = () => {
		this.actionSheet.show();
	}

	selectKiosk = (index) => {
		if(index === this.state.kiosks.length) return;
		this.setState({selectedKiosk: this.state.kiosks[index]});
	}
	handleDisabled = () => {
		if(this.state.selectedKiosk && this.state.fromStartDate && this.state.fromStartTime && this.state.fromEndDate && this.state.fromEndTime ) return false
		else return true
	}
	
	handleShowDate = () => {
		if(this.state.dateStart) {
			if(this.state.fromStartDate) return this.state.fromStartDate;
			else return new Date();
		} 
		if(this.state.dateEnd) {
			if(this.state.fromEndDate) return this.state.fromEndDate;
			else return new Date();
		}
	}

	handleShowTime = () => {
		if(this.state.timeStart) {
			if(this.state.fromStartTime) return this.state.fromStartTime;
			else return new Date();
		}
		if(this.state.timeEnd) {
			if(this.state.fromEndTime) return this.state.fromEndTime;
			else return new Date();
		}
	}
	

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}>
					<HeaderNavbar 
						center={
							<ResizableLogo
								size="small"
							/>
						}
						right={
							<CloseBtn 
								onPress={()=> this.props.navigation.navigate('ReportsScreen')}
							/>
						}
						statusBar="dark-content"
					/>
					<View style={[styles.flex1, styles.baseHorizontalMargin, styles.baseBottomMargin]}>
						<HugeText 
							text="Crear un nuevo reporte"
							weight="bold"
							color="dark"
						/>
						<View style={styles.smallVerticalMargin}>
							<BodyText 
								text="Selecciona un rango de fechas para generar un nuevo reporte"
								weight="light"
								color="lightBlack"
							/>
						</View>
						<View style={[styles.fullWidth, styles.baseVerticalMargin, styles.flex1]}>
							<GetKiosksContainer>
								{(kiosks) => (
									<TouchableOpacity 
										onPress={() => this.showActionShet()}
										activeOpacity={1}
										style={styles.elevation}
									>	
										<View style={styles.spacerInput}>
											<LabeledInput 
												label="Kiosko"
												color="blue"
											>
												<View style={[styles.inputContent, styles.centerObjects]}>
													<TextInput
														editable={false}
														value={this.state.selectedKiosk.name}
														onLayout={e => {
															Keyboard.dismiss();
															this.setState({kiosks})}
														}
														placeholder="Escribe el nombre de tu sucursal"
														placeholderTextColor={Colors.gray}
														style={{color:Colors.dark}}
														selectionColor={Colors.blue}
													/>
												</View>
												<View style={styles.hint}/>
											</LabeledInput>
											<ActionSheet
												ref={o => this.actionSheet = o}
												options={kiosks.map(kiosk =>  kiosk.name).concat('Cancel')}
												cancelButtonIndex={kiosks.length}
												destructiveButtonIndex={kiosks.length}
												onPress={(index) => this.selectKiosk(index)}
											/>
										</View>
									</TouchableOpacity>
								)}
							</GetKiosksContainer>

							<View style={[styles.row, styles.spacerInput]}>
								<View style={styles.flex07}>
									<TouchableOpacity 
										onPress={() => this.showPicker('date', 'dateStart')}
										activeOpacity={1}
										disabled={this.state.selectedKiosk == 0}
									>
										<LabeledInput
											color={this.state.selectedKiosk.name ? 'blue' : 'subdued'}
											label="Desde"
										>
											<View style={[styles.inputContent, styles.centerObjects]}>
												<TextInput
													editable={false} 
													ref={(input) => this.secondInput = input}
													value={this.state.fromStartDate > 0 ? (moment(this.state.fromStartDate).format('D-MMM-YYYY')) : this.state.fromStartDate }
													placeholder="15-May-2019"
													placeholderTextColor={Colors.gray}
													style={{color:Colors.dark}}
													selectionColor={Colors.blue}
													onSubmitEditing={() => this.thirdInput.focus()}
												/>
											</View>
											<View style={styles.hint}/>
										</LabeledInput>
									</TouchableOpacity>
								</View>
								<View style={[styles.flex03, styles.smallLeftMargin]}>
									<TouchableOpacity 
										disabled={this.state.fromStartDate.length == 0}
										onPress={() => this.showPicker('time', 'timeStart')}
										activeOpacity={1}
										style={styles.elevation}
									>
										<BorderedInput
											editable={false} 
											ref={(input) => this.thirdInput = input}
											color={this.state.fromStartDate ? 'blue' : 'subdued'}
											value={this.state.fromStartTime > 0 ? moment(this.state.fromStartTime).format('HH:mm') : this.state.fromStartTime }
											placeholder="00:00"
											placeholderColor="gray"
											textColor="dark"
											selectionColor="blue"
											onSubmitEditing={() => this.fourthInput.focus()}
										/>
									</TouchableOpacity>
								</View>
							</View>

							<View style={[styles.row, styles.spacerInput]}>
								<View style={styles.flex07}>
									<TouchableOpacity
										disabled={this.state.fromStartTime.length == 0}
										//disabled={this.state.fromStartDate.length == 0}
										onPress={() => this.showPicker('date', 'dateEnd')}
										activeOpacity={1}
									>
										<LabeledInput 
											label="Hasta"
											color={this.state.fromStartTime ? 'blue' : 'subdued'}
										>
											<View style={[styles.inputContent, styles.centerObjects]}>
												<TextInput 
													editable={false}
													ref={(input) => this.fourthInput = input}
													value={this.state.fromEndDate > 0 ? moment(this.state.fromEndDate).format('D-MMM-YYYY') : this.state.fromEndDate }
													placeholder="16-May-2019"
													placeholderTextColor={Colors.gray}
													style={{color:Colors.dark}}
													selectionColor={Colors.blue}
													onSubmitEditing={() => this.fifthInput.focus()}
												/>
											</View>
											<View style={styles.hint}/>
										</LabeledInput>
									</TouchableOpacity>
								</View>
								<View style={[styles.flex03, styles.smallLeftMargin]}>
									<TouchableOpacity 
										disabled={this.state.fromEndDate.length == 0}
										onPress={() => this.showPicker('time', 'timeEnd')}
										activeOpacity={1}
										style={styles.elevation}
									>
										<BorderedInput
											editable={false}
											ref={(input) => this.fifthInput = input}
											value={this.state.fromEndTime > 0 ? moment(this.state.fromEndTime).format('HH:mm') : this.state.fromEndTime }
											color={this.state.fromEndDate ? 'blue' : 'subdued'}
											placeholder="00:00"
											placeholderColor="gray"
											textColor="dark"
											selectionColor="blue"
										/>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<DateTimePicker
						date={this.handleShowDate()}
						maximumDate={new Date()}
						isVisible={this.state.isDatePickerVisible}
						onConfirm={this.handleDatePicked}
						onCancel={this.hideDateTimePicker}
			        />
			        <DateTimePicker
			        	mode='time'
						date={this.handleShowTime()}
						isVisible={this.state.isTimePickerVisible}
						onConfirm={this.handleTimePicked}
						onCancel={this.hideDateTimePicker}
			        />
			        { this.state.showAlert && 
				        <ShowAlert
							show={this.state.showAlert}
							showProgress={false}
							title={this.state.alertHead}
							message={this.state.alertBody}
							showCancelButton={false}
							showConfirmButton={true}
							//cancelText="No, cancel"
							confirmText="OK"
							confirmButtonColor={Colors.red}
							// onCancelPressed={() => {
							// this.hideAlert();
							// }}
							onConfirmPressed={() => {
								this.setState({showAlert: false});
							}}
				        />
			        }
					<SafeAreaView>
						<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin]}>
							<PrimaryBtn 
								text='Generar Reporte'
								bgColor="blue"
								disabled={this.handleDisabled()}
								onPress={ () => {
									let fromStartDate = moment(this.state.fromStartDate).format().split('T');
									let fromStartTime = moment(this.state.fromStartTime).format().split('T');
									let fromEndDate = moment(this.state.fromEndDate).format().split('T');
									let fromEndTime = moment(this.state.fromEndTime).format().split('T');
									this.props.navigation.navigate('LoadingScreen', {
										transition: 'collapseExpand',
										bgColor: 'blue',
										screen: 'SummaryReportScreen',
										title: 'Generando reporte...',
										state: {
											kiosk: this.state.selectedKiosk,
											startDatetime: fromStartDate[0].concat('T').concat(fromStartTime[1]),
											endDatetime: fromEndDate[0].concat('T').concat(fromEndTime[1]),
										},
										subtitle: 'Estamos generando tu reporte. Esto puede tardar un par de minutos.'
									})
								}}
							/>
						</View>
					</SafeAreaView>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
