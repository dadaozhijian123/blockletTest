# 产品需求文档

## Launch on Blocklet Server

[![Launch on Blocklet Server](https://assets.arcblock.io/icons/launch_on_blocklet_server.svg)](https://install.arcblock.io/launch?action=blocklet-install&meta_url=https%3A%2F%2Fgithub.com%2Fdadaozhijian123%2FblockletTest%2Freleases%2Fdownload%2Fv0.1.1%2Fblocklet.json)

## 1. 概述

本产品需求文档描述了用户 Profile 信息的展示和编辑功能，旨在提供用户友好的界面以管理其个人信息。

## 2. 功能需求

### 2.1 主界面

- **展示用户 Profile 信息**
  - 显示以下字段：
    - 用户名
    - 邮箱
    - 手机号

- **编辑按钮**
  - 在展示模式下提供一个“编辑”按钮，用户点击后切换到编辑模式。

### 2.2 编辑模式

- **可编辑字段**
  - 在编辑模式下，用户可以修改以下字段：
    - 用户名
    - 邮箱
    - 手机号

- **保存功能**
  - 提供一个“保存”按钮，用户点击后将修改后的数据保存并切换回展示模式。
  - 数据保存后，展示最新的用户 Profile 信息。

## 3. 数据存储

- **持久化保存**
  - 用户 Profile 信息通过nedb保存到后端,。

## 4. 技术要求

- **前端**
  - 使用 React 或其他现代前端框架实现用户界面。

- **后端**
  - 使用 Node.js 或其他合适的后端技术来处理数据的持久化。

## 5. 交互流程

1. 用户打开主界面，看到其 Profile 信息。
2. 用户点击“编辑”按钮，界面切换到编辑模式。
3. 用户修改必要字段。
4. 用户点击“保存”按钮，修改的数据发送到后端进行保存。
5. 界面返回展示模式，显示最新的 Profile 信息。

## 6. 其他需求

- **输入验证**
  - 在编辑模式下，对用户输入的邮箱和手机号进行基本的格式验证。

- **用户友好的界面**
  - 确保界面简洁、易于使用，符合用户体验设计原则。

## 7. 参考

- 相关库和工具的选择可根据团队熟悉度和项目需求进行调整。