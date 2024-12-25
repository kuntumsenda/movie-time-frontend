<script lang="ts" setup>
const props = defineProps({
  label: String,
  labelLeft: String,
  isLabelLeft: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "change"]);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}
</script>
<template>
  <label
    :class="[classes.mCheckbox, isLabelLeft && classes.left]"
    class="text-sm"
  >
    <span>
      <slot name="labelLeft" />
      {{ labelLeft }}
    </span>
    <input
      :checked="modelValue"
      type="checkbox"
      :class="classes.mCheckboxInput"
      @input="onInput"
      @change="$emit('change', $event)"
    />
    <span :class="classes.checkmark"></span>
    <span>
      <slot name="label" />
      {{ label }}
    </span>
  </label>
</template>
<style lang="css" module="classes">
.mCheckbox {
  display: block;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
  gap: 5px;
  transition: background 0.3s;
  border-radius: 4px;
}
.checkmark {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  height: 14px;
  width: 14px;
  border: 1px solid #ffffff80;
  border-radius: 4px;
  transition: all 0.002s ease-in-out;
}
.mCheckbox:hover {
  background: #ffffff1c;
}
.left {
  padding: 4px;
}
.left .checkmark {
  left: unset;
  right: 4px;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 2px;
  top: -2px;
  width: 7px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.mCheckboxInput {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.mCheckboxInput:checked ~ .checkmark {
  background: #e74c3c;
  border-width: 2px;
}
.mCheckboxInput:checked ~ .checkmark:after {
  display: block;
}
.mCheckboxInput:disabled ~ .checkmark {
  cursor: default;
  background-color: #ffffff33;
  border-color: #ffffff80;
}
.mCheckboxInput:disabled ~ .checkmark:after {
  background: #e74c3c;
}
</style>
