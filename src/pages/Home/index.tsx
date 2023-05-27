import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from 'antd';
import html2canvas from 'html2canvas';
import { useMemo } from 'react';
import ColorSelect from './components/ColorSelect';
import { ValueType } from './type';
const inputNumberStyle = {
  width: '100%',
};
const divLocation = {
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  left: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
const HomePage: React.FC = () => {
  const [form] = Form.useForm<ValueType>();
  const pictureWidth = Form.useWatch('pictureHeight', form);
  const pictureHeight = Form.useWatch('pictureHeight', form);
  const startColor = Form.useWatch('startColor', form);
  const endColor = Form.useWatch('endColor', form);
  const pictureLayout = Form.useWatch('pictureLayout', form);

  const title = Form.useWatch('title', form);
  const titleLocation = Form.useWatch('titleLocation', form);
  const titleFontSize = Form.useWatch('titleFontSize', form);
  const titleTop = Form.useWatch('titleTop', form);
  const titleBottom = Form.useWatch('titleBottom', form);

  const content = Form.useWatch('content', form);
  const contentFontSize = Form.useWatch('contentFontSize', form);
  const contentLeft = Form.useWatch('contentLeft', form);
  const contentRight = Form.useWatch('contentRight', form);
  const contentTop = Form.useWatch('contentTop', form);
  const lineHeight = Form.useWatch('lineHeight', form);

  const showWhat = useMemo(() => {
    const titleShow = pictureLayout?.find((item) => item === 'title')
      ? true
      : false;
    const contentShow = pictureLayout?.find((item) => item === 'content')
      ? true
      : false;
    return {
      titleShow,
      contentShow,
    };
  }, [pictureLayout]);

  const bodyStyle = useMemo(() => {
    return {
      width: pictureWidth,
      height: pictureHeight,
      background: `linear-gradient(${startColor},${endColor})`,
    };
  }, [pictureWidth, pictureHeight, startColor, endColor]);

  const titleStyle = useMemo(() => {
    return {
      ...divLocation[titleLocation],
      fontSize: titleFontSize,
      paddingTop: titleTop,
      paddingBottom: titleBottom,
    };
  }, [titleLocation, titleFontSize, titleTop, titleBottom]);

  const contentStyle = useMemo(() => {
    return {
      paddingRight: contentRight,
      paddingLeft: contentLeft,
      paddingTop: contentTop,
      fontSize: contentFontSize,
      lineHeight: lineHeight,
    };
  }, [contentRight, contentLeft, contentFontSize, lineHeight, contentTop]);

  const takeScreenshot = ({
    pictureName,
    suffixName,
  }: {
    pictureName: string;
    suffixName: string;
  }) => {
    const node = document.getElementById('TitleAndContent') as HTMLElement;
    if (node) {
      html2canvas(node, {
        useCORS: true,
        height: node.offsetHeight,
        width: node.offsetWidth,
        scrollY: 0,
        scrollX: 0,
      }).then(async (canvas) => {
        const a = document.createElement('a'); // 创建下载链接
        a.href = canvas.toDataURL();
        a.target = '_blank'; // 新开页下载
        a.download = `${pictureName || '默认图片'}.${suffixName || 'png'}`; // 下载文件名
        document.body.appendChild(a); // 添加dom元素
        a.click(); //  点击下载
        document.body.removeChild(a); // 下载后移除元素
      });
    } else {
      message.error('下载失败~请联系管理员');
    }
  };
  const onFinish = (values: any) => {
    const { pictureName, suffixName } = form.getFieldsValue();
    console.log('Success:', values);
    takeScreenshot({ pictureName, suffixName });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onChange={(values) => {
            console.log(values);
          }}
          initialValues={{
            pictureWidth: 1920,
            pictureHeight: 1080,
            pictureName: '默认图片',
            suffixName: 'png',
            startColor: '#f64188',
            endColor: '#f89c3e',
            pictureLayout: ['title', 'content'],
            title: '标题',
            titleLocation: 'center',
            titleTop: 40,
            titleBottom: 0,
            titleFontSize: 90,
            content: '内容',
            contentFontSize: 14,
            contentLeft: 40,
            contentRight: 40,
            contentTop: 40,
            lineHeight: 1,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="PictureName" name="pictureName">
            <Input />
          </Form.Item>
          <Form.Item label="SuffixName" name="suffixName">
            <Select
              options={[
                { label: 'png', value: 'png' },
                { label: 'jpg', value: 'jpg' },
              ]}
            />
          </Form.Item>

          <Form.Item label="PictureWidth" name="pictureWidth">
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>

          <Form.Item label="PictureHeight" name="pictureHeight">
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>

          <Form.Item label="PictureLayout" name="pictureLayout">
            <Checkbox.Group
              options={[
                { label: '标题', value: 'title' },
                { label: '内容', value: 'content' },
              ]}
            />
          </Form.Item>
          <Form.Item label="StartColor" name="startColor">
            <ColorSelect />
          </Form.Item>

          <Form.Item label="EndColor" name="endColor">
            <ColorSelect />
          </Form.Item>

          <Form.Item
            hidden={!showWhat.titleShow}
            label="TitleName"
            name="title"
          >
            <Input />
          </Form.Item>

          <Form.Item
            hidden={!showWhat.titleShow}
            label="TitleLocation"
            name="titleLocation"
          >
            <Select
              options={[
                { label: '居中', value: 'center' },
                { label: '居右', value: 'left' },
                { label: '居左', value: 'right' },
              ]}
            />
          </Form.Item>

          <Form.Item
            hidden={!showWhat.titleShow}
            name="titleTop"
            label="TitleTop"
          >
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>

          <Form.Item
            hidden={!showWhat.titleShow}
            name="titleBottom"
            label="TitleBottom"
          >
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>

          <Form.Item
            hidden={!showWhat.titleShow}
            name="titleFontSize"
            label="TitleFontSize"
          >
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>

          <Form.Item
            hidden={!showWhat.contentShow}
            name="content"
            label={'Content'}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            hidden={!showWhat.contentShow}
            name="contentFontSize"
            label={'ContentFontSize'}
          >
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>
          <Form.Item
            hidden={!showWhat.contentShow}
            name="contentLeft"
            label={'ContentLeft'}
          >
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>
          <Form.Item
            hidden={!showWhat.contentShow}
            name="contentRight"
            label={'ContentRight'}
          >
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>
          <Form.Item
            hidden={!showWhat.contentShow}
            name="contentTop"
            label={'ContentTop'}
          >
            <InputNumber style={{ ...inputNumberStyle }} />
          </Form.Item>
          <Form.Item
            hidden={!showWhat.contentShow}
            name="lineHeight"
            label={'LineHeight'}
          >
            <InputNumber style={{ ...inputNumberStyle }} step={0.1} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={14}>
        <div
          id="TitleAndContent"
          style={{
            ...bodyStyle,
          }}
        >
          {showWhat.titleShow && (
            <div>
              <div
                style={{
                  ...titleStyle,
                }}
              >
                {title}
              </div>
            </div>
          )}
          {showWhat.titleShow && (
            <div>
              <div style={{ ...contentStyle }}>{content}</div>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default HomePage;
