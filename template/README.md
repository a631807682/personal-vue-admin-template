# 探伤检测web端

# 发布

## 打包
> npm run build

## nginx 配置
```
location / {
  root /data/www/crack-detection;
  try_files $uri $uri/ /index.html;
}
```

## sh脚本

`local_deploy.sh`可能结果`windows`编辑，需要改成`unix`文件格式。
> vim local_deploy.sh
> :set fileformat=unix 
