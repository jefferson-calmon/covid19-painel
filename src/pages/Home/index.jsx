/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css'

const Home = () => {

  const [ selectedUf, setSelectedUf ] = useState('All')
  const [ selectedCountry, setSelectedCountry ] = useState('Brazil')
  const [ countries, setCountries ] = useState()
  const [ states, setStates ] = useState()

  var testeState;

  useEffect(() => getDataCountry(), [selectedCountry])

  useEffect(() => {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/').then(res => {
      const dataStates = res.data.data;

      setStates(dataStates)
    })
  }, [setSelectedCountry])

  useEffect(() => {
    if (selectedCountry === 'Brazil'){

      loadState()

    }else{
      let sel = document.getElementById('uf');
      let optionElement = sel.getElementsByTagName('option');
      let lenOption = optionElement.length
      

      for (let i = 1; i < lenOption ; i++){
        let option = sel.getElementsByTagName('option')[1]
        sel.removeChild(option)
      }
    }
  })

  function getDataCountry(){
    axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/${selectedCountry}`).then(res => {
      const dataCountry = res.data.data
      let cases = document.getElementById('cases');
      let death = document.getElementById('death');
      let suspect = document.getElementById('suspect');
      let refuse = document.getElementById('refuse');
      
      let date = document.getElementById('date');
      let nameCountry = document.getElementById('nameCountry');
      
      let nameState = document.getElementById('nameState');
      nameState.innerText = ``

      date.innerText = `
      ${dataCountry.updated_at.substring(8, 10)}/${dataCountry.updated_at.substring(5, 7)}/${dataCountry.updated_at.substring(0, 4)}`;

      nameCountry.innerText = dataCountry.country;

      cases.innerText = dataCountry.confirmed
      death.innerText = dataCountry.deaths
      suspect.innerText = dataCountry.cases
      refuse.innerText = dataCountry.recovered
    })
  }


  function getDataState(){
      let cases = document.getElementById('cases');
      let death = document.getElementById('death');
      let suspect = document.getElementById('suspect');
      let refuse = document.getElementById('refuse');
      
      let date = document.getElementById('date');

      if (testeState === "All"){
        getDataCountry()
        return
      }

      axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${testeState}`).then(res => {
        const dataState = res.data

        date.innerText = `
        ${dataState.datetime.substring(8, 10)}/${dataState.datetime.substring(5, 7)}/${dataState.datetime.substring(0, 4)}`;
        
        let nameState = document.getElementById('nameState');
        nameState.innerText = `-${dataState.uf}`

        if (!dataState.error){
          cases.innerText = dataState.cases
          death.innerText = dataState.deaths
          suspect.innerText = dataState.suspects
          refuse.innerText = dataState.refuses
        }
    })
  }
  


  function handleSelectedUf(event){
    const uf = event.target.value

    setSelectedUf(uf)
    testeState = uf
    getDataState()
  }

  function handleSelectedCountry(event){
      const country = event.target.value

      setSelectedCountry(country)
  }

  function loadState(){
      if (states){
        states.map(state => {

          let option = document.createElement('option');
          let sel = document.getElementById('uf');

          option.setAttribute('key', state.state)
          option.value = (state.uf).toLowerCase()
          option.text = state.state
          option.setAttribute('className', 'option')
          return sel.appendChild(option)

        })
      }
  }

  function loadCountry(){
    if (countries){
      countries.map(country => {

        let option = document.createElement('option');
        let sel = document.getElementById('country');

        option.setAttribute('key', country)
        option.value = country
        option.text = country
        return sel.appendChild(option)

      })
    }
  }

  useEffect(() => {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/countries').then(response => { 
      const listCountry = []  
      
      response.data.data.map(con => listCountry.push(con.country))

      setCountries(listCountry.sort())
    })
  }, [])
      

    return(
        <div className="App">
      <header>
        <h1>Painel <span>Covid-19</span></h1>
      </header>

      <div className="container">
        <div className="select-info">
          <h2>Selecione a região</h2>

          <div className="row country">
            <h3>País</h3>
            <select
            name="country"
            id="country"
            value={selectedCountry}
            onChange={handleSelectedCountry}
            >
              <option value="Brazil">Brazil</option>
              {loadCountry()}

            </select>
          </div>

          <div className="row state">
            <h3>Estado</h3>
            <select
            name="uf"
            id="uf"
            value={selectedUf}
            onChange={handleSelectedUf}
            // onClick={() => alert('Esta função ainda está em desenvolvimento')}
            >
              <option value="All">Todos os estados</option>


            </select>
          </div>

          

        </div>
        
        <div className="info">
          <h2>Informações</h2>
          <p>Informações sobre casos de covid-19 em: </p>
          <h2><span id="nameCountry">Brasil</span><span id="nameState"></span></h2>

          <div className="data">

            <div className="cases info-data">
              <h3>Casos</h3>
              <h2 id="cases" className="numberInfo">0</h2>
            </div >
            <div className="death info-data">
              <h3>Mortes</h3>
              <h2 id="death" className="numberInfo">0</h2>
              
            </div >
            <div className="suspect info-data">
              <h3>Suspeitos</h3>
              <h2 id="suspect" className="numberInfo">0</h2>

            </div >
            <div className="refuse info-data">
              <h3>Liberados</h3>
              <h2 id="refuse" className="numberInfo">0</h2>

            </div >

          </div>

          <p className="date" id="update">Atualizado em <span id="date">--/--/----</span></p>

        </div>

      </div >


      <footer>
        <p>Powered by <a href="htpps://github.com/jefferson-calmon">Jefferson Ferrari</a></p>
        <p id="tes"></p>
      </footer>
    </div>
    )
}

export default Home;