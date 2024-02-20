// Auth
import { auth, } from './firebase-config';
import { cloud_db, getCloudDatas, addByDoc, getByDoc, getByRef, getCloudDatasWithCondition } from './firebase-db';

export { auth, cloud_db, addByDoc, getCloudDatas, getByDoc, getByRef, getCloudDatasWithCondition };