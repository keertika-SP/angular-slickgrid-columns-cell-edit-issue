import { Component, OnInit } from '@angular/core';
import {
  Column,
  GridOption,
  AngularGridInstance,
  Filters,
  FieldType,
  Editors,
} from 'angular-slickgrid';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  columnDefinitions: Column[];
  columnDefinitionsMORE: Column[];
  columnDefinitionsLESS: Column[];
  gridOptions: GridOption;
  dataset: any[];
  showMoreFields: boolean = true;
  angularGrid: AngularGridInstance;
  gridObj: any;
  isEnableCheckboxSelector: boolean = true;

  ngOnInit(): void {
    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15,
      },
      checkboxSelector: {
        hideInFilterHeaderRow: true,
        hideInColumnTitleRow: false,
      },
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false,
      },
      enableCheckboxSelector: true,
      enableAutoResize: true,
      enableCellNavigation: true,
      editable: true,
      autoEdit: true,
    };

    this.columnDefinitionsMORE = [
      {
        id: 'id',
        name: 'Id',
        field: 'id',
        sortable: true,
        type: FieldType.string,
        // editor: Slick.Editors.Text,
        //  validator: requiredFieldValidator,
        width: 40,
      },
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        sortable: true,
        type: FieldType.string,
        width: 70,
        editor: {
          model: Editors.longText,
          required: true,
        },
      },
      {
        id: 'title1',
        name: 'Title2',
        field: 'title',
        sortable: true,
        type: FieldType.string,
        width: 70,
        minWidth: 70,
        filterable: true,
        editor: {
          model: Editors.longText,
        },
        formatter: (row, cell, val) => {
          return val
            ? `${val} <span class="fa fa-pencil" style="padding: 2px; border: 1px solid #e0e0e0"><i class="fa fa-edit fa fa-pencil"></i></span>`
            : '';
        },
        onCellClick: (event) => {
          // cancel click event when it's not the edit icon
          if (
            !(event.target as HTMLSpanElement).classList.contains('fa-pencil')
          ) {
            event.stopImmediatePropagation();
          }
        },
      },
    ];

    this.columnDefinitionsLESS = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        sortable: true,
        type: FieldType.string,
        width: 70,
      },
    ];

    this.columnDefinitions = this.columnDefinitionsMORE;

    this.dataset = [];
    for (let i = 0; i < 100; i++) {
      this.dataset[i] = {
        id: i,
        title: 'Task ' + i,
        title1: 'Task1-' + i,
      };
    }
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
  }

  toggleColumns() {
    this.showMoreFields = !this.showMoreFields;
    if (this.showMoreFields) {
      this.columnDefinitions = this.columnDefinitionsMORE;
    } else {
      this.columnDefinitions = this.columnDefinitionsLESS;
    }

    var options = this.gridObj.getOptions();
    this.isEnableCheckboxSelector = options.enableCheckboxSelector;
    console.log(
      'toggleColumns - this.isEnableCheckboxSelector: ' +
        this.isEnableCheckboxSelector
    );
  }

  addColumns() {
    const allColumns = this.gridObj.getColumns();

    // then add your column to this full set of columns
    allColumns.push({
      id: 'title1',
      name: 'Title1',
      field: 'title1',
      sortable: true,
      type: FieldType.string,
      width: 70,
    });
    this.columnDefinitions = [...allColumns];
  }

  deleteColumns() {
    const allColumns = this.gridObj.getColumns();

    // then add your column to this full set of columns
    allColumns.pop();
    this.columnDefinitions = [...allColumns];
  }

  enableCheckboxSelector() {
    this.gridObj.setOptions({
      enableCheckboxSelector: true,
    });
  }
}
