import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ModalConfig } from './modal.config'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import {FormControl, FormGroup} from "@angular/forms";
import {selectTokenApiKey, selectTokenValue} from "../../../../story/selectors";
import {Store} from "@ngrx/store";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

@Injectable()

export class ModalComponent implements OnInit {
  loading = false;
  sendSuccess = false;
  responsePush = null;

  @Input() public modalConfig: ModalConfig = {
    modalTitle: "Send push notice",
    dismissButtonLabel: 'Send',
    closeButtonLabel: 'Close',
    disableCloseButton: () => {
      return this.loading;
    },
    disableDismissButton: () => {
      return this.loading;
    }
  }
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  private modalRef: NgbModalRef
  pushForm!: FormGroup
  private token: any;
  private apiKey: any;

  constructor(
    private modalService: NgbModal,
    private store: Store<{ token: string }>,
    private http: HttpClient,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    // берем время и прибавляем час
    const now = new Date();
    now.setHours(now.getHours() + 1);

    this.pushForm = new FormGroup({
      user_id: new FormControl('17145,15897,15970'),
      push_message: new FormControl('Только сегодня скидка 10% на все товары!'),
      date_start: new FormControl(this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss')),
    })

    // получаем токен из хранилища
    this.store.select(selectTokenValue).subscribe((r) => this.token = r);

    // получаем Апи ключ
    this.store.select(selectTokenApiKey).subscribe((r) => this.apiKey = r);
  }

  open() {
    this.sendSuccess = false;
    this.modalRef = this.modalService.open(this.modalContent)
    this.modalRef.result.then()
  }

  close() {
    this.loading = false;
    this.sendSuccess = false;
    this.responsePush = null;
    this.modalRef.close();
  }

  dismiss() {
    this.loading = true;
    this.sendSuccess = true;
  }

  submitPushForm() {
    if (this.token && this.apiKey) {
      const FormValues = this.pushForm.value;
      Object.keys(FormValues).forEach((k) => (FormValues[k] == '' || FormValues[k] == null) && delete FormValues[k]);

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', this.apiKey);

      this.http.request('POST', 'https://api.asgk-group.ru/v1/' + this.token + '/message/push', {
        responseType:'json',
        headers,
        body: FormValues,
      }).subscribe((response) => {
        // @ts-ignore
        this.responsePush = JSON.stringify(response);
        this.sendSuccess = true;
        this.loading = false;
      });
    }
  }
}
