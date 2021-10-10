import React, { useEffect, useState, useCallback } from 'react';
import { sortBy } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import '@fontsource/roboto';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Summary from './components/Summary';
import Highlight from './components/Hightlight';
import CountrySelector from './components/CountrySelector';
import { getCountries } from './components/apis';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');

  useEffect(() => {
    getCountries().then(res => {
      const { data } = res;
      const countries = sortBy(data, 'Country');
      setCountries(countries);
    });
  }, []);

  const handleOnChange = useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

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
      <Highlight />
      <Summary />
    </Container>
  );
}

export default App;
