import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	SafeAreaView,
	ScrollView,
	Dimensions
} from 'react-native';

import styles from './SummaryReportScreenStyle';
import { Colors, ApplicationStyles, Metrics } from 'qualificame-native/app/styles';

import Pill from 'qualificame-native/app/components/Pill';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import BodyText from 'qualificame-native/app/components/BodyText';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import PieGraph from 'qualificame-native/app/components/PieGraph';
import ShowAlert from 'qualificame-native/app/components/ShowAlert';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import SecondaryBtn from 'qualificame-native/app/components/SecondaryBtn';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

import DeleteReportContainer from 'qualificame-native/app/containers/DeleteReportContainer';
import SwitchColor from 'qualificame-native/app/utils/SwitchColor';
import ApiService from 'qualificame-native/app/services/ApiService';
import moment from 'moment';

export default class SummaryReportScreen extends Component {	
	static navigationOptions = {
		header: null
	}

	state = {
		showAlert: false,
		alertHead: '',
		alertBody: '',
		reportDates: this.props.navigation.state.params[1],
		pieData: this.props.navigation.state.params[0],
		onConfirmPressed: () => {},
	}

	handleNoData = (exc, avg, bad, awful) => {
		if(exc === 0 && avg === 0 && bad === 0 && awful === 0 )
			return 100;
	}

	saveReport = async (fetchReports, clearReports, save=true, reports=false) =>  {
		if(save){
			fetchReports();
			this.props.navigation.navigate('ReportsScreen');
		} else {
			await ApiService.deleteReport(this.state.pieData.id).then(res => {
				clearReports();
				fetchReports();
				if(reports){
					this.props.navigation.navigate('CreateReportScreen');
				} else {
					this.props.navigation.navigate('ReportsScreen')
				}
			}, err => {
				console.log(err);
			});
		}
	}

	render() {
		let { total_excellent, total_average, total_bad, total_awful, result_tag, result } = this.state.pieData;
		let { startDatetime, endDatetime } = this.state.reportDates;
		return (
			<View style={styles.container}>
				<DeleteReportContainer>
					{(fetchReports, clearReports) => (
						<HeaderNavbar 
							left={
								<BackBtn 
									color='dark'
									onPress={()=> this.saveReport(fetchReports, clearReports, false, true)}
								/>
							}
							center={
								<ResizableLogo
									size="small"
								/>
							}
							right={
								<CloseBtn 
									onPress={()=> this.saveReport(fetchReports, clearReports, false)}
								/>
							}
							statusBar="dark-content"
						/>
					)}
				</DeleteReportContainer>
				<ScrollView>
					<View style={[styles.flex1, styles.baseHorizontalMargin, styles.baseBottomMargin]}>
						<HugeText
							text="¡Parece que te fue muy bien!"
							weight="bold"

						/>
						<BodyText 
							text="Lorem ipsum dolor sit amet"
							weight="light"
							color='lightBlack'
						/> 
						<View style={styles.baseVerticalMargin}>
							<View style={styles.row}>
								<BodyText 
									text="Del "
									color="blue"
								/>
								<BodyText 
									text={` ${moment(startDatetime).format('D')} de ${moment(startDatetime).format('MMMM')} a las ${moment(startDatetime).format('HH:mm')} `}
								/>
							</View>
							<View style={styles.row}>
								<BodyText 
									text="Hasta "
									color="blue"
								/>
								<BodyText 
									text={`el ${moment(endDatetime).format('D')} de ${moment(endDatetime).format('MMMM')} a las ${moment(endDatetime).format('HH:mm')} `}
								/>
							</View>
						</View>
						<View style={[styles.alignItemsCenter, styles.baseTopMargin]}>
							<PieGraph
								width={Math.round( (Metrics.screenWidth / 2)*1.15 )}
								height={Math.round( (Metrics.screenHeight / 2.9) )}
								data={[
									{x: "green",  y: total_excellent},
									{x: "blue",   y: total_average},
									{x: "orange", y: total_bad},
									{x: "pink",   y: total_awful},
									{x: "gray",   y: this.handleNoData(total_excellent, total_average, total_bad, total_awful)}
								]}
								label={result+"%"}
								labelColor={SwitchColor(result_tag)}
								stroke={Metrics.screenHeight > 179 ? 20 : 15}
							/>

							<View style={[styles.row, styles.centerObjects, styles.baseTopMargin]}>
								<Pill 
									reaction= "excelent"
									amount={String(total_excellent)}
								/>
								<View style={styles.smallLeftMargin}/>
								<Pill
									reaction= "good"
									amount={String(total_average)}
								/>
							</View>
							<View style={[styles.row, styles.centerObjects, styles.smallTopMargin]}>
								<Pill
									reaction= "bad"
									amount={String(total_bad)}
								/>
								<View style={styles.smallLeftMargin}/>
								<Pill
									reaction= "horrible"
									amount={String(total_awful)}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
				<SafeAreaView>
					<View style={[styles.baseVerticalMargin, styles.baseHorizontalMargin, styles.row]}>
						<View style={[styles.flex1, styles.smallRightMargin]}> 
							<DeleteReportContainer>
								{(fetchReports, clearReports) => (
									<SecondaryBtn 
										color="blue"
										text="Descartar"
										onPress={()=> {
											this.setState({
												showAlert: true,
												alertHead: 'Descartando reporte',
												alertBody: '¿Estás seguro de que deseas descartar el reporte?',
												onConfirmPressed: () => { this.saveReport(fetchReports, clearReports, false) },
											})
										}}
									/>
								)}
							</DeleteReportContainer>
						</View>
						<View style={[styles.flex1, styles.smallLeftMargin]}>
							<DeleteReportContainer>
								{(fetchReports, clearReports) => (
									<PrimaryBtn
										weight='regular' 
										bgColor="blue"
										text="Guardar reporte"
										onPress={()=> this.saveReport(fetchReports, clearReports) }
									/>
								)}
							</DeleteReportContainer>

						</View>
					</View>
				</SafeAreaView>
				{ this.state.showAlert && 
			        <ShowAlert
						show={this.state.showAlert}
						showProgress={false}
						title={this.state.alertHead}
						message={this.state.alertBody}
						showCancelButton
						showConfirmButton
						cancelText='Cancelar'
						confirmText='Descartar'
						confirmButtonColor={Colors.red}
						onCancelPressed={() => this.setState({showAlert: false})}
						onConfirmPressed={() => this.state.onConfirmPressed()}
			        />
				}
			</View>
		);
	}
}
