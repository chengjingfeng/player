import {ipcMain,dialog} from 'electron'


class OpenDialog{
    init(){
        this.openFile()
        this.openFolder()
    }
    // 打开文件
    openFile(){
        // 同步通讯
        // ipcMain.on('openFile',(e)=>{
        //     dialog.showOpenDialog({
        //         title:'打开文件',
        //         defaultPath:'xxx',
        //         properties:['openFile','multiSelections'],
        //         filters: [
        //             {name: 'video', extensions: ['MP4', 'WebM', 'Ogg']}
        //         ]
        //     },(path)=>{
        //         if(!path){
        //             e.returnValue=null
        //             return
        //         }
        //         // path是选择文件后返回的路径
        //         // 主进程接收到渲染进程发送过来的消息并且返回消息
        //         e.returnValue=path
        //     })
        // })


        // 异步通讯
        ipcMain.on('openFile',(e)=>{
            dialog.showOpenDialog({
                title:'打开文件',
                defaultPath:'xxx',
                properties:['openFile','multiSelections'],
                filters: [
                    {name: 'video', extensions: ['MP4', 'WebM', 'Ogg']}
                ]
            },(path)=>{
                if(!path){
                    return
                }
                e.sender.send('openFile-ok',path)
            })
        })
    }
    // 打开文件夹
    openFolder(){
        ipcMain.on('openFolder',(e)=>{
            dialog.showOpenDialog({
                title:'打开文件夹',
                properties:['openDirectory','multiSelections']
            },(path)=>{
                if(!path){
                    return
                }
                console.log(path)
                e.sender.send('openFolder-ok',path)
            })
        })
    }
}

export default OpenDialog