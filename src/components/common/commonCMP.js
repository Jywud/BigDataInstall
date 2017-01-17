import Vue from 'vue'
import { Radio, RadioGroup, Checkbox, Select, Option, Table, TableColumn, Progress, Form, FormItem } from 'element-ui'

export default{
	addElementUI: function() {
		Vue.component(Radio.name, Radio);
		Vue.component(RadioGroup.name, RadioGroup);

		Vue.component(Checkbox.name, Checkbox);

		Vue.component(Select.name, Select);
		Vue.component(Option.name, Option);

		Vue.component(Table.name, Table);
		Vue.component(TableColumn.name, TableColumn);

		Vue.component(Progress.name, Progress);

		Vue.component(Form.name, Form);
		Vue.component(FormItem.name, FormItem);
	}
}
