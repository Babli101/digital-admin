import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../contact.service';
import { SubscriberService } from '../subscriber.service';
import { VisitorService } from '../visitor.service';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexFill,
  ApexPlotOptions
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgApexchartsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  // ===========================
  //          COUNTERS
  // ===========================
  totalContacts = 0;
  recentContacts: any[] = [];
  totalSubscribers = 0;
  todayVisitors = 0;
  weeklyContacts = 0;

  contacts: any[] = [];

  constructor(
    private contactService: ContactService,
    private subscriberService: SubscriberService,
    private visitorService: VisitorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCounters();
    this.loadMonthData();
    this.loadSubscriberChart();
  }

  // ===========================
  //        COUNTERS LOADING
  // ===========================
  private loadCounters() {

    this.contactService.getContacts().subscribe((res: any) => {
      this.contacts = res;
      this.totalContacts = res.length || 0;
      this.weeklyContacts = Math.floor(this.totalContacts / 7);
    });

    this.contactService.getRecentUsers().subscribe({
      next: res => {
        this.recentContacts = res;
        this.cdr.detectChanges();
      }
    });

    this.subscriberService.getAllSubscribers().subscribe((res: any) => {
      this.totalSubscribers = res.length || 0;
    });

    this.visitorService.getVisitorStats().subscribe((res: any) => {
      this.todayVisitors = res.today || 0;
    });
  }

  // ===========================
  // VISITOR AREA CHART
  // ===========================
  selectedView: 'month' | 'week' = 'month';

  visitorSeries: ApexAxisChartSeries = [];
  visitorColors: string[] = ['#470000'];

  visitorChart: ApexChart = {
    type: 'area',
    height: 320,
    toolbar: { show: false },
    foreColor: '#740808ff'
  };

  visitorXAxis: ApexXAxis = {};

  visitorStroke: ApexStroke = {
    curve: 'smooth',
    colors: ['#470000']
  };

  visitorFill: ApexFill = {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#470000'],
      inverseColors: false,
      opacityFrom: 0.8,
      opacityTo: 0.2,
      stops: [0, 90, 100]
    }
  };

  setView(view: 'month' | 'week') {
    this.selectedView = view;
    view === 'month' ? this.loadMonthData() : this.loadWeekData();
  }

  loadMonthData() {
    this.visitorService.getMonthlyVisitors().subscribe((res: any) => {
      this.visitorSeries = [{ name: 'Visitors', data: res.data }];
      this.visitorXAxis = { categories: res.categories };
    });
  }

  loadWeekData() {
    this.visitorService.getWeeklyVisitors().subscribe((res: any) => {
      this.visitorSeries = [{ name: 'Visitors', data: res.data }];
      this.visitorXAxis = { categories: res.categories };
    });
  }

  // ===========================
  // SUBSCRIBER BAR CHART
  // ===========================
  barSeries: ApexAxisChartSeries = [];
  barChart: ApexChart = { type: 'bar', height: 300 };

  barXAxis: ApexXAxis = {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    labels: {
      style: {
        colors: '#878b94ff',
        fontSize: '12px'
      }
    }
  };

  barOptions: ApexPlotOptions = {
    bar: {
      borderRadius: 4,
      columnWidth: '40%',
      colors: {
        backgroundBarOpacity: 1,
        ranges: [
          {
            from: 0,
            to: 10000,
            color: '#470000'
          }
        ]
      }
    }
  };

  loadSubscriberChart() {
    this.subscriberService.getWeeklySubscribers().subscribe((res: any) => {
      this.barSeries = [{ name: 'Subscribers', data: res.data }];
      this.barXAxis = { categories: res.categories };
    });
  }

  // ===========================
  // DELETE CONTACT
  // ===========================
  deleteContact(id: string | number) {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.recentContacts = this.recentContacts.filter(c => c._id !== id);
      },
      error: err => {
        alert('Failed to delete contact.');
      }
    });
  }

  // ===========================
  // EDIT CONTACT
  // ===========================
  editContact(contact: any) {
    const newName = prompt('Enter new name:', contact.name);
    if (!newName) return;

    const updatedContact = { ...contact, name: newName };

    this.contactService.updateContact(contact._id, updatedContact).subscribe({
      next: () => {
        const index = this.contacts.findIndex(c => c._id === contact._id);
        if (index > -1) this.contacts[index] = updatedContact;

        this.cdr.detectChanges();
      },
      error: () => alert('Failed to update contact.')
    });
  }
}
