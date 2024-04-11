    import { DotChartOutlined } from '@ant-design/icons';
    import React, { useState } from 'react';
    import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';

    const Skeleton = () => {
    const [active, setActive] = useState(false);
    const [block, setBlock] = useState(false);
    const [size, setSize] = useState('default');
    const [buttonShape, setButtonShape] = useState('default');
    const [avatarShape, setAvatarShape] = useState('circle');
    const handleActiveChange = (checked) => {
        setActive(checked);
    };
    const handleBlockChange = (checked) => {
        setBlock(checked);
    };
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };
    const handleShapeButton = (e) => {
        setButtonShape(e.target.value);
    };
    const handleAvatarShape = (e) => {
        setAvatarShape(e.target.value);
    };
    return (
        <div>
        <Space>
            <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
            <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
            <Skeleton.Input active={active} size={size} />
        </Space>
        <br />
        <br />
        <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
        <br />
        <br />
        <Skeleton.Input active={active} size={size} block={block} />
        <br />
        <br />
        <Space>
            <Skeleton.Image active={active} />
            <Skeleton.Node active={active}>
            <DotChartOutlined
                style={{
                fontSize: 40,
                color: '#bfbfbf',
                }}
            />
            </Skeleton.Node>
        </Space>
        <Divider />
        <Form
            layout="inline"
            style={{
            margin: '16px 0',
            }}
        >
            <Space size={16} wrap>
            <Form.Item label="Active">
                <Switch checked={active} onChange={handleActiveChange} />
            </Form.Item>
            <Form.Item label="Button and Input Block">
                <Switch checked={block} onChange={handleBlockChange} />
            </Form.Item>
           

         
            </Space>
        </Form>
        </div>
    );
    };
    export default Skeleton;