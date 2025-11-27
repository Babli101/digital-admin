import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  // ===========================
  //    COUNTERS (API DATA)
  // ===========================
  totalContacts = 0;
  totalSubscribers = 0;
  todayVisitors = 0;
  weeklyContacts = 0;

  constructor(
    private contactService: ContactService,
    private subscriberService: SubscriberService,
    private visitorService: VisitorService
  ) { }

  ngOnInit() {
    this.loadCounters();
    this.loadMonthData();       // Visitor chart default
    this.loadSubscriberChart(); // Subscriber bar chart
  }

  // ===========================
  //    COUNTERS
  // ===========================
  private loadCounters() {
    // Contacts
    this.contactService.getContacts().subscribe((res: any) => {
      this.totalContacts = res.length || 0;
      this.weeklyContacts = Math.floor(this.totalContacts / 7);
    });

    // Subscribers
    this.subscriberService.getAllSubscribers().subscribe((res: any) => {
      this.totalSubscribers = res.length || 0;
    });

    // Visitors
    this.visitorService.getVisitorStats().subscribe((res: any) => {
      this.todayVisitors = res.today || 0;
    });
  }

  // ===========================
  //   VISITOR CHART (WEEK/MONTH)
  // ===========================
  selectedView: 'month' | 'week' = 'month';

  visitorSeries: ApexAxisChartSeries = [];
  visitorChart: ApexChart = { type: "area", height: 320 };
  visitorXAxis: ApexXAxis = {};
  visitorStroke: ApexStroke = { curve: "smooth" };
  visitorFill: ApexFill = { type: "gradient" };

  setView(view: 'month' | 'week') {
    this.selectedView = view;
    view === 'month' ? this.loadMonthData() : this.loadWeekData();
  }

  loadMonthData() {
    this.visitorSeries = [
      { name: "Visitors", data: [80, 60, 150, 40, 90, 100, 110, 130, 90, 100, 120, 70] }
    ];
    this.visitorXAxis = { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
  }

  loadWeekData() {
    this.visitorSeries = [
      { name: "Visitors", data: [50, 70, 40, 90, 55, 80, 60] }
    ];
    this.visitorXAxis = { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] };
  }

  // ===========================
  //       BAR CHART (SUBSCRIBER)
  // ===========================
  barSeries: ApexAxisChartSeries = [];
  barChart: ApexChart = { type: "bar", height: 300 };
  barXAxis: ApexXAxis = {
    categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    labels: {
      style: {
        colors: "#878b94ff",
        fontSize: "12px"
      }
    }
  };
  barOptions: ApexPlotOptions = {
    bar: {
      borderRadius: 4,
      columnWidth: "40%"
    }
  };

  loadSubscriberChart() {
  this.subscriberService.getWeeklySubscribers().subscribe((res: any) => {

    console.log("WEEKLY API RESPONSE:", res);

    this.barSeries = [{ name: "Subscribers", data: res.data }];
    this.barXAxis = { categories: res.categories };
  });
}


}
