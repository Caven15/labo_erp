import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/models/auth/registerForm.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-utilisateur',
  templateUrl: './register-utilisateur.component.html',
  styleUrls: ['./register-utilisateur.component.css']
})
export class RegisterUtilisateurComponent implements OnInit {

  public registerForm : FormGroup;
  public utilisateur : RegisterForm;
  public errorMessage : string = "";

  constructor(private _route : Router, private _authService : AuthService, private _formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this._formBuilder.group({
      nom : [null, [Validators.required, Validators.minLength(1), Validators.maxLength(80)]],
      prenom : [null, [Validators.required, Validators.minLength(1), Validators.maxLength(80)]],
      dateNaissance : [null,[Validators.required]],
      email : [null, [Validators.email,Validators.required]],
      password : [null, [Validators.required, Validators.minLength(6), Validators.minLength(20)]],
      confirmPassword : [null, [Validators.required]]
    })
  }

    // Enregistrer l'utilisateur à l'appui du bouton enregistrer
  register(): void{
    console.log("register");
    this.errorMessage = "";
    this.conversion();// récupérer l'utilisateur
    this._authService.Register(this.utilisateur).subscribe(
      {
        next : (data) => {
          // chargement du module ensuite le component
          this._route.navigate(["auth", "login"]);
        }, 
        error : (error) =>{
          this.errorMessage = "l'enregistrement a échoué veuillez ressayer...";
          console.log(error);
        },
      }
    );
  }
  
  // Récupérer l'utilisateur à enregistrer
  conversion(): void{
    this.utilisateur = new RegisterForm();
    this.utilisateur.nom = this.registerForm.value["nom"];
    this.utilisateur.prenom = this.registerForm.value["prenom"];
    this.utilisateur.dateNaissance = new Date(this.registerForm.value["dateNaissance"]);
    this.utilisateur.email = this.registerForm.value["email"];
    this.utilisateur.password = this.registerForm.value["password"];
  }
}