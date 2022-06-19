import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  mensaje: any;
  oracion: any;

  constructor() {
    if ('speechSynthesis' in window) {
      this.mensaje = new SpeechSynthesisUtterance();
    } else {
      alert("Lo siento, tu navegador no soporta esta tecnología");
    }
    // this.validarSpeak = global;
    // console.log(this.validarSpeak);
  }


  ngOnInit(): void {
  }

  playSpeak(a1: string) {
    this.oracion = document.getElementById(a1)!.innerHTML;
    this.mensaje.text = this.oracion;
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.cancel();
      speechSynthesis.speak(this.mensaje);
    }
  }

  stopSpeak() {
    speechSynthesis.pause();
  }

  playSpeak2(a1: string, a2: string, a3: string) {

    this.oracion = document.getElementById(a1)!.innerHTML + "." + document.getElementById(a2)!.innerHTML + ". " + document.getElementById(a3)!.innerHTML;
    this.mensaje.text = this.oracion;
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.cancel();
      speechSynthesis.speak(this.mensaje);
    }
  }

}