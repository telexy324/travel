# 旅游景点应用

这是一个使用 Expo 和 React Native 开发的旅游景点应用。

## 功能特点

- 地图展示景点位置
- 景点详情查看
- 用户登录和注册
- 标记已去过和想去的景点
- 景点排行榜
- 个人中心

## 技术栈

- Expo
- React Native
- TypeScript
- Expo Router
- Zustand
- React Native Maps

## 开始使用

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm start
```

3. 在 iOS 模拟器上运行：

```bash
npm run ios
```

## 项目结构

```
travel/
  ├── app/                # 页面组件
  ├── components/         # 可复用组件
  ├── store/             # 状态管理
  ├── types/             # TypeScript 类型定义
  ├── assets/            # 静态资源
  └── lib/               # 工具函数
```

## 开发说明

- 使用 Expo Router 进行路由管理
- 使用 Zustand 进行状态管理
- 使用 TypeScript 进行类型检查
- 使用 React Native Maps 进行地图展示

## 注意事项

- 需要配置 Mapbox API Key
- 需要实现后端 API 集成
- 需要实现用户认证
- 需要实现数据持久化 