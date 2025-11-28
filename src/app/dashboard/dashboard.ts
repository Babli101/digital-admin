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
  //          COUNTERS
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
    this.loadMonthData();        // default visitor chart
    this.loadSubscriberChart();  // subscriber bar chart
  }

  // ===========================
  //         COUNTERS
  // ===========================
  private loadCounters() {
    this.contactService.getContacts().subscribe((res: any) => {
      this.totalContacts = res.length || 0;
      this.weeklyContacts = Math.floor(this.totalContacts / 7);
    });

    this.subscriberService.getAllSubscribers().subscribe((res: any) => {
      this.totalSubscribers = res.length || 0;
    });

    this.visitorService.getVisitorStats().subscribe((res: any) => {
      this.todayVisitors = res.today || 0;
    });
  }

  // ===========================
  //  VISITOR CHART (BACKEND)
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

  // ---------------------------
  // MONTH DATA FROM BACKEND
  // ---------------------------
  loadMonthData() {
    this.visitorService.getMonthlyVisitors().subscribe((res: any) => {
      this.visitorSeries = [
        { name: "Visitors", data: res.data }
      ];
      this.visitorXAxis = { categories: res.categories };
    });
  }

  loadWeekData() {
    this.visitorService.getWeeklyVisitors().subscribe((res: any) => {
      this.visitorSeries = [
        { name: "Visitors", data: res.data }
      ];
      this.visitorXAxis = { categories: res.categories };
    });
  }

  // ===========================
  //   SUBSCRIBER BAR CHART
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

