import React from 'react';
import { FiInstagram, FiGithub, FiLinkedin, FiCode } from 'react-icons/fi'

import './styles.css';

const Contato = () => {

    var stateToggle = true;

    function toggleMenu(){
        const toggle = stateToggle;
        const icon = document.querySelector('#iconMenu');
    
        let nav = document.querySelector('#nav');
    
        if (toggle){
          nav.style.display = 'block'
          nav.style.opacity = "1"
          icon.style.color = '#000'
          icon.className = 'fas fa-times'
        }else{
          nav.style.display = 'none'
          nav.style.opacity = "0"
          icon.style.color = '#fff'
          icon.className = 'fas fa-bars'
        }
    
        
        stateToggle = !stateToggle;
    }

    return(
        <div className="App">
            <header>
                <h1>Painel <span>Covid-19</span></h1>
                <nav id="nav">
                <ul>
                    <li><a href="/" onClick={toggleMenu} rel="noopener noreferrer">Painel</a></li>
    
                    <li><a href="https://covid19-brazil-api.now.sh/" target="_blank" rel="noopener noreferrer">API</a></li>
                    
                    <li><a href="https://github.com/jefferson-calmon/covid19-painel" target="_blank" rel="noopener noreferrer">Sobre</a></li>
    
                    <li><a href="/contato" rel="noopener noreferrer">Contato</a></li>
    
                </ul>
                </nav>
                
                <div id="iconMenu" onClick={toggleMenu} className="fas fa-bars"></div>
                <div id="toggle"></div>
            </header>

            <div id="container">
                <h1>Entre em contato</h1>
                <div className="contactBox">
                    <a href="#usdh" target="_blank" rel="noopener noreferrer">
                        <div className="box">
                        <FiLinkedin/>
                        <span className="link">Linkedin</span>
                        </div>
                    </a>
                    <a href="#usdh" target="_blank" rel="noopener noreferrer">
                        <div className="box">
                        <FiGithub />
                        <span  className="git"> GitHub</span>
                        </div>
                    </a>
                    <a href="#usdh" target="_blank" rel="noopener noreferrer">
                        <div className="box">
                        <FiInstagram />
                        <span  className="insta"> Instagram</span>
                        </div>
                    </a>
                    <a href="#usdh" target="_blank" rel="noopener noreferrer">
                        <div className="box">
                        <FiCode />
                        <span className="port">Portfólio</span>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Contato;