import React, {useState} from 'react';
import {db, dbService, storageService} from '../fbase';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';

const Nweet = ({nweetObj, isOwner}) => {

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말로 삭제하시겠습니까?");

        if (ok) {
            await dbService.deleteDoc(dbService.doc(db, "nweets", nweetObj.id));
            if (nweetObj.attachmentUrl !== "") {
                const deleteRef = await storageService.ref(storageService.getStorage, nweetObj.attachmentUrl);
                await storageService.deleteObject(deleteRef);
            }
        }
    }

    const toggleEditing = () => setEditing(prev => !prev);

    const onEditChange = (e) => {
        const {
            target : {value}
        } = e;

        setNewNweet(value);
    }

    const onEditSubmit = async (e) => {
        e.preventDefault();
        await dbService.updateDoc(dbService.doc(db, "nweets", nweetObj.id), {
            text : newNweet
        });

        setNewNweet("");
        setEditing(false);
    }
    return (
        <div className="nweet">
            {
                editing ?
                    isOwner && (
                    <>
                    <form onSubmit={onEditSubmit} className="container nweetEdit">
                        <input type="text" value={newNweet} placeholder="Edit your nweet!"  required onChange={onEditChange} className="formInput"/>
                        <input type="submit" value="Edit Nweet"  className="formBtn"/>
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                    </>
                ) :  (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt={nweetObj.attachmentUrl} />}
                        { isOwner && (
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                </span>
                            </div>
                        ) }
                    </>
                )

            }


        </div>
    )
}

export default Nweet;
