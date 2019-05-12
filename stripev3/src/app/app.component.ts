import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { ApiService } from './api.service';
import { NgForm } from '@angular/forms';


// const stripe = (<any>window).Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
// const elements = stripe.elements();
declare var stripe: any;
declare var elements: any;
declare var $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  title = 'stripev3';
  user :any = {};
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  cardSystem: boolean = true;
  
  
  
  
  constructor(private apiService : ApiService,
    private cd: ChangeDetectorRef) {
      
    }
        ngOnInit(): void {
          // $('#exampleModal').modal('show');
// $('#myModal').modal('hide');

        }
  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'black'
        }
      }
    };
    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);
  
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    console.log(this.card,"card");
    const {token, error} = await stripe.createToken(this.card);
    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      const data = {
        token : token.id,
        user : this.user
      }
      console.log(data,"go ");
      this.apiService.addUserCard(data).subscribe(
        resx => {
          console.log("111111111", resx);
        }, err =>{
          console.log("222222222", err);
        }
      );
      // ...send the token to the your backend to process the charge
    }
  }

  signup() {
    this.user = {
      name : "test Raj Kumar Sharma",
      email : "trajksahrma@yopmail.com"
    }
    this.apiService.addUser(this.user).subscribe(
      res =>{
        console.log(res ," res");
        this.user = res;
        if(res.stripeCusId){
          this.cardSystem = true;
          $('#exampleModal').modal('show');
        }
      }, err =>{
        console.log();
      }
    );
  }
}
