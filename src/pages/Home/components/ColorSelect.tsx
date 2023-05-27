import { ColorPicker } from 'antd';

const ColorSelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (arg: string) => void;
}) => {
  const newOnChange = (color, value: string) => {
    if (onChange) onChange(value);
  };
  return (
    <div>
      <ColorPicker value={value} onChange={newOnChange} />
    </div>
  );
};

export default ColorSelect;
