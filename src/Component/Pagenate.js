import {
  collection,
  endBefore,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

const Pagenate = async (
  name,
  firstVisible = null,
  lastVisible = null,
  props = null
) => {
  const postsPath = `boards/${name}/post`;

  const postquery = query(
    collection(db, postsPath),
    where("isnotice", "==", false),
    orderBy("date", "desc")
  );
  const postsnapshot = await getDocs(postquery);
  const postdata = [];
  postsnapshot.forEach((doc) => {
    postdata.push({ id: doc.id, ...doc.data() });
  });

  let first = query(
    collection(db, postsPath),
    where("isnotice", "==", false),
    orderBy("date", "desc"),
    limit(10)
  );

  if (props === "prev") {
    if (firstVisible) {
      first = query(
        collection(db, postsPath),
        where("isnotice", "==", false),
        orderBy("date", "desc"),
        endBefore(firstVisible),
        limit(10)
      );
    }
  }
  if (props === "next") {
    if (lastVisible) {
      first = query(
        collection(db, postsPath),
        where("isnotice", "==", false),
        orderBy("date", "desc"),
        startAfter(lastVisible),
        limit(10)
      );
    }
  }

  const snapshot = await getDocs(first);
  const data = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  const firstVisibleDoc = snapshot.docs[0];
  const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
  const prevvisible = postsnapshot.docs[0].id === firstVisibleDoc.id;
  const nextvisible =
    postsnapshot.docs[postsnapshot.docs.length - 1].id === lastVisibleDoc.id;

  return {
    data,
    firstVisible: firstVisibleDoc,
    lastVisible: lastVisibleDoc,
    prevvisible,
    nextvisible,
  };
};

export default Pagenate;
