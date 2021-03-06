import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SFValue } from '../../interface';
import { SFSchemaEnum } from '../../schema';
import { getData, toBool } from '../../utils';
import { ControlUIWidget } from '../../widget';
import { SFSelectWidgetSchema } from './schema';

@Component({
  selector: 'sf-select',
  templateUrl: './select.widget.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class SelectWidget extends ControlUIWidget<SFSelectWidgetSchema> implements OnInit {
  i: any;
  data: SFSchemaEnum[];
  _value: any;
  hasGroup = false;

  private checkGroup(list: SFSchemaEnum[]): void {
    this.hasGroup = (list || []).filter(w => w.group === true).length > 0;
  }

  ngOnInit(): void {
    const {
      autoClearSearchValue,
      allowClear,
      borderless,
      autoFocus,
      dropdownClassName,
      dropdownMatchSelectWidth,
      serverSearch,
      maxMultipleCount,
      mode,
      notFoundContent,
      showSearch,
      tokenSeparators,
      maxTagCount,
      compareWith,
    } = this.ui;
    this.i = {
      autoClearSearchValue: toBool(autoClearSearchValue, true),
      allowClear,
      borderless: toBool(borderless, false),
      autoFocus: toBool(autoFocus, false),
      dropdownClassName: dropdownClassName || null,
      dropdownMatchSelectWidth: toBool(dropdownMatchSelectWidth, true),
      serverSearch: toBool(serverSearch, false),
      maxMultipleCount: maxMultipleCount || Infinity,
      mode: mode || 'default',
      notFoundContent,
      showSearch: toBool(showSearch, true),
      tokenSeparators: tokenSeparators || [],
      maxTagCount: maxTagCount || undefined,
      compareWith: compareWith || ((o1: any, o2: any) => o1 === o2),
    };
  }

  reset(value: SFValue) {
    getData(this.schema, this.ui, value).subscribe(list => {
      this._value = value;
      this.data = list;
      this.checkGroup(list);
      this.detectChanges();
    });
  }

  change(values: SFValue) {
    if (this.ui.change) {
      this.ui.change(values);
    }
    this.setValue(values == null ? undefined : values);
  }

  openChange(status: boolean) {
    if (this.ui.openChange) {
      this.ui.openChange(status);
    }
  }

  searchChange(text: string) {
    if (this.ui.onSearch) {
      this.ui.onSearch(text).then((list: SFSchemaEnum[]) => {
        this.data = list;
        this.checkGroup(list);
        this.detectChanges();
      });
      return;
    }
    this.detectChanges();
  }

  scrollToBottom() {
    if (this.ui.scrollToBottom) {
      this.ui.scrollToBottom();
    }
  }
}
