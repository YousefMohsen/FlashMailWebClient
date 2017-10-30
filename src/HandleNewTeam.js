
class HandleNewTeam  {

parseData(formData){
 var result = {teamName: formData.name, teamList:[{}]};   

formData.teamList.split(",").map((student)=>{


var studentName =student.substring(student.indexOf("“")+1,student.indexOf("\"")); 
var studentEmail =  student.substring(student.indexOf("<")+1,student.indexOf(">")).replace(/ /g,''); 
result.teamList.push({studentName: studentName, studentEmail: studentEmail});


});

return result;

}















}

export default new HandleNewTeam();