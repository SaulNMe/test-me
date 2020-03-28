import moment from 'moment';

var monthsShortDot = 'Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.'.split('_'),
    monthsShort = 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_');

var monthsParse = [/^Ene/i, /^Feb/i, /^Mar/i, /^Abr/i, /^May/i, /^Jun/i, /^Jul/i, /^Ago/i, /^Sep/i, /^Oct/i, /^Nov/i, /^Dic/i];
var monthsRegex = /^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Ene\.?|Feb\.?|Mar\.?|Abr\.?|May\.?|Jun\.?|Jul\.?|Ago\.?|Sep\.?|Oct\.?|Nov\.?|Dic\.?)/i;


moment.locale('es', {
	months : 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
       monthsShort : function (m, format) {
           if (!m) {
               return monthsShortDot;
           } else if (/-MMM-/.test(format)) {
               return monthsShort[m.month()];
           } else {
               return monthsShortDot[m.month()];
           }
       },
       monthsRegex: monthsRegex,
       monthsShortRegex: monthsRegex,
       monthsStrictRegex: /^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre)/i,
       monthsShortStrictRegex: /^(Ene\.?|Feb\.?|Mar\.?|Abr\.?|May\.?|Jun\.?|Jul\.?|Ago\.?|Sep\.?|Oct\.?|Nov\.?|Dic\.?)/i,
       monthsParse: monthsParse,
       longMonthsParse: monthsParse,
       shortMonthsParse: monthsParse,
       weekdays : 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
       weekdaysShort : 'dom._lun._Mar._mié._jue._vie._sáb.'.split('_'),
       weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
       weekdaysParseExact : true,
       longDateFormat : {
           LT : 'h:mm A',
           LTS : 'h:mm:ss A',
           L : 'DD/MM/YYYY',
           LL : 'D [de] MMMM [de] YYYY',
           LLL : 'D [de] MMMM [de] YYYY h:mm A',
           LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
       },
       calendar : {
           sameDay : function () {
               return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
           },
           nextDay : function () {
               return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
           },
           nextWeek : function () {
               return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
           },
           lastDay : function () {
               return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
           },
           lastWeek : function () {
               return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
           },
           sameElse : 'L'
       },
       relativeTime : {
           future : 'en %s',
           past : 'Hace %s',
           s : 'unos segundos',
           ss : '%d segundos',
           m : 'un minuto',
           mm : '%d minutos',
           h : 'una hora',
           hh : '%d horas',
           d : 'un día',
           dd : '%d días',
           M : 'un mes',
           MM : '%d meses',
           y : 'un año',
           yy : '%d años'
       },
       dayOfMonthOrdinalParse : /\d{1,2}º/,
       ordinal : '%dº',
       week : {
           dow : 1, // Monday is the first day of the week.
           doy : 4  // The week that contains Jan 4th is the first week of the year.
       }
});