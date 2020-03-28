import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	ScrollView,
	Dimensions
} from 'react-native';
import moment from 'moment';

import styles from './ReportDetailScreenStyle';
import { Colors, Metrics } from 'qualificame-native/app/styles';

import Pill from 'qualificame-native/app/components/Pill';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import PieGraph from 'qualificame-native/app/components/PieGraph';
import HugeText from 'qualificame-native/app/components/HugeText';
import BodyText from 'qualificame-native/app/components/BodyText';
import DeleteBtn from 'qualificame-native/app/components/DeleteBtn';
import ShowAlert from 'qualificame-native/app/components/ShowAlert';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';


import ApiService from 'qualificame-native/app/services/ApiService';
import SwitchColor from 'qualificame-native/app/utils/SwitchColor';
import DeleteReportContainer from 'qualificame-native/app/containers/DeleteReportContainer';

export default class ReportDetailScreen extends Component {	
	static navigationOptions = {
		header: null
	}
	
	state = {
		showAlert: false,
		alertHead: '',
		alertBody: '',
		onConfirmPressed: () => {},
		report: this.props.navigation.state.params.item
	}

	handleNoData = (exc, avg, bad, awful) => {
		if(exc === 0 && avg === 0 && bad === 0 && awful === 0 )
			return 100;
	}

	deleteReport = async (fetchReports, clearReports) =>  {
		await ApiService.deleteReport(this.state.report.id).then(res => {
			clearReports();
			fetchReports();
			this.props.navigation.goBack();
		}, err => {
			console.log(err);
		});
	}

	render() {
		let { total_excellent, total_average, total_bad, total_awful, result_tag, result } = this.state.report;
		return (
			<View style={styles.container}>
				<HeaderNavbar
					left={<BackBtn color='dark'/>}
					center={
						<ResizableLogo
							size="small"
						/>
					}
					right={
						<DeleteReportContainer>
							{(fetchReports, clearReports) => (
								<DeleteBtn 
									onPress={ () => {
										this.setState({
											showAlert: true,
											alertHead: 'Eliminando reporte',
											alertBody: '¿Estás seguro de que deseas eliminar el reporte?',
											onConfirmPressed: () => { this.deleteReport(fetchReports, clearReports) }
										})
									}}
								/>
							)}
						</DeleteReportContainer>
					}
					statusBar="dark-content"
				/>
				<ScrollView>
					<View style={[styles.flex1, styles.baseHorizontalMargin]}>
						<HugeText
							text="¡Parece que te fue muy bien!"
							weight="bold"
						/>
						<View style={styles.smallVerticalMargin}>
							<BodyText 
								text="Lorem ipsum dolor sit amet"
								weight="light"
								color='lightBlack'
							/> 
						</View>
						<View style={styles.baseVerticalMargin}>
							<View style={styles.row}>
								<BodyText 
									text="Desde: "
									color="blue"
								/>
								<BodyText 
									text={` ${moment(this.state.report.start_datetime).format('D MMMM')} a las ${moment(this.state.report.start_datetime).format('HH:mm')} `}
								/>
							</View>
							<View style={styles.row}>
								<BodyText 
									text="Hasta: "
									color="blue"
								/>
								<BodyText 
									text={` ${moment(this.state.report.end_datetime).format('D MMMM')} a las ${moment(this.state.report.end_datetime).format('HH:mm')} `}
								/>
							</View>
						</View>

						<View style={[styles.alignItemsCenter]}>
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
				{ this.state.showAlert && 
			        <ShowAlert
						show={this.state.showAlert}
						showProgress={false}
						title={this.state.alertHead}
						message={this.state.alertBody}
						showCancelButton
						showConfirmButton
						cancelText='Cancelar'
						confirmText='Eliminar'
						confirmButtonColor={Colors.red}
						onCancelPressed={() => this.setState({showAlert: false, alertHead: '', alertBody: ''})}
						onConfirmPressed={() => this.state.onConfirmPressed()}
			        />
				}
			</View>
		);
	}
}
