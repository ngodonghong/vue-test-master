<template>
  <div ref="column-chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { IOption, ITable } from '@/models/chart';

/**
 * @Use Google Chart
 */
@Component
export default class Chart extends Vue {
  @Prop({ type: Object, required: true })
  dataTable!: ITable;

  @Prop({ type: Object, required: true })
  options!: IOption;

  @Watch('data', { deep: true })
  onDataChange() {
    this.loadChart();
  }

  @Ref('column-chart') readonly columnChart!: HTMLDivElement;

  drawLineColors(datatable: any) {
    const data = new window.google.visualization.DataTable(datatable);
    const chart = new window.google.visualization.ColumnChart(this.columnChart);
    chart.draw(data, this.options);
  }

  loadChart() {
    if (this.dataTable) {
      if (window.google) {
        window.google.charts.load('current', {
          packages: ['corechart']
        });
        window.google.charts.setOnLoadCallback(() => this.drawLineColors(this.dataTable));
      } else {
        setTimeout(() => {
          this.loadChart();
        }, 50);
      }
    }
  }

  mounted() {
    this.loadChart();
  }
}
</script>
