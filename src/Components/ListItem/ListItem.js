import React from 'react';
import firebase from '../../Config/firebase'
 const db=firebase.firestore()
const ListItem=({user, requiredDate})=> {
  var newlist=[{t:8}, {t:"o"}]
  db.collection(user).where("date", "==", requiredDate)
  .get().then(docs=>{
    
    docs.forEach(doc=>{
      var k={
        id: doc.id,
        ...doc.data()
      }
      newlist[2]=k
      //console.log(newlist.push(k))
    })
  }).catch(e=>{console.log(e)})
  console.log(newlist)
  newlist.forEach((doc)=>{
    console.log(doc)
  })
  return (
    <div className='w-70 bg-black center h2 br3 ma2'>
     list items
    </div>
  );
}

export default ListItem;
