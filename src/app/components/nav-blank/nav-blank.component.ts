import { Component, OnInit, SimpleChanges } from '@angular/core';
import { cartData } from 'src/app/shared/interfaces/cart';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CartRequestsService } from 'src/app/shared/services/cart-requests.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _CartRequestsService: CartRequestsService
  ) {}

  logOut(): void {
    this._AuthenticationService.logOut();
  }

  numberOfitems: number = 0;
  // cartData!: any;
  // cartspinner: boolean = false;

  // ngOnInit(): void {
  //   this._CartRequestsService.getUserCart().subscribe({
  //     next: (data) => {
  //       // console.log(data.numOfCartItems, 'shop slaa');
  //       this.numberOfitems = data.numOfCartItems;
  //       this.ngOnChanges(data);
  //     }
  //   });
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this._CartRequestsService.getUserCart().subscribe({
  //     next: (respons) => {
  //       // console.log(respons);
  //       this.cartData = respons.data;
  //       this.cartspinner = false;
  //     },
  //   });
  //   this._CartRequestsService.getUserCart().subscribe({
  //     next: (data) => {
  //       // console.log(data.numOfCartItems, 'shop');
  //       this.numberOfitems = data.numOfCartItems;
  //       this.ngOnChanges(data);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this._CartRequestsService.numberOfitems.subscribe({
      next: (data) => {
        this.numberOfitems = data;
      },
    });
    // this._CartRequestsService.cartData.subscribe({
    //   next: (data) => {
    //     this.cartData = data;
    //   },
    // });

    this._CartRequestsService.getUserCart().subscribe({
      next: (data) => {
        this.numberOfitems = data.numOfCartItems;
        // this.cartData = data.data;
      },
    });

    // this._CartRequestsService.getUserCart().subscribe({
    //   next: (data) => {
    //     this.numberOfitems = data.numOfCartItems;
    //     this.ngOnChanges(data);
    //   },
    // });
    window.addEventListener('scroll', () => {
      // console.log(window.scrollY);
      let data = window.scrollY;
      // console.log(data);

      this.scrollVlaue = data;
    });
  }

  // added: boolean = false;
  // ngOnChanges(changes: SimpleChanges): void {
  //   this._CartRequestsService.getUserCart().subscribe({
  //     next: (respons) => {
  //       this.cartData = respons.data;
  //       this.cartspinner = false;
  //     },
  //   });
  //   this._CartRequestsService.getUserCart().subscribe({
  //     next: (data) => {
  //       this.numberOfitems = data.numOfCartItems;
  //       this.ngOnChanges(data);
  //     },
  //   });
  // }
  scrollVlaue: number = 0;

  // menu: boolean = false;
  // DisplayitemsOnDropDown(): void {
  //   if (this.menu == false) {
  //     this.User = false;
  //     this.menu = true;
  //   } else {
  //     this.menu = false;
  //   }
  // }
  User: boolean = false;
  useerDropDowen(): void {
    if (this.User == false) {
      this.User = true;
    } else {
      this.User = false;
    }
  }

  getStyleObject(): any {
    if (this.scrollVlaue > 150) {
      return {
        'padding-left': '110px',
        'padding-right': '110px',
        // add other properties based on your condition
      };
    }
    //else if (this.scrollVlaue <= 150) {
    //   return {
    //     'padding-left': '80px',
    //     'padding-right': '80px',
    //     // add other properties based on your condition
    //   };
    // }
  }

  flootingActionBtn(): void {
    window.scrollTo(0, 0);
  }
}
