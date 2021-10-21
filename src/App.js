import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { sortBy } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import '@fontsource/roboto';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Summary from './components/Summary';
import Highlight from './components/Highlight';
import CountrySelector from './components/CountrySelector';
import { getCountries, getReportByCountry } from './components/apis';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = React.useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, 'Country');
      setCountries(countries);
      setSelectedCountryId('vn');
    });
  }, []);
  
  const handleOnChange = useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);


  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        // remove last item = current date
        res.data.pop();
        setReport(res.data);
      })
    }
  }, [selectedCountryId, countries]);



  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: 'Số ca nhiễm',
          count: latestData.Confirmed,
          type: 'confirmed',
        },
        {
          title: 'Khỏi',
          count: latestData.Active,
          type: 'recovered',
        },
        {
          title: 'Tử vong',
          count: latestData.Deaths,
          type: 'death',
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant='h2' component='h2'>
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector
        value={selectedCountryId}
        countries={countries}
        handleOnChange={handleOnChange}/>
      <Highlight summary={summary} />
      <Summary report={report}/>
    </Container>
  );
}

export default App;
