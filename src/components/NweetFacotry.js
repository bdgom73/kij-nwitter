import React, {useState} from 'react';
import {db, dbService, storageService} from '../fbase';
import {v4 as uuidv4} from 'uuid';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const NweetFacotry = ({user}) => {

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit =  async (e) => {
        e.preventDefault();

        let attachmentUrl = "";

        if (attachment !== "") {
            const ref = storageService.ref(storageService.getStorage, `${user.uid}/${uuidv4()}`);
            const response = await storageService.uploadString(ref, attachment, 'data_url');
            attachmentUrl = await storageService.getDownloadURL(response.ref);
        }

        const obj = {
            text : nweet,
            createAt : Date.now(),
            creatorId : user.uid,
            attachmentUrl
        }

        await dbService.addDoc(dbService.collection(db, 'nweets'), obj)
        setNweet("");
        setAttachment("");
    }

    const onChange = (e) => {
        const {
            target : { value }
        } = e;

        setNweet(value);
    }

    const onFileChange = (e) => {
        const {
            target : { files }
        } = e;

        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (fileEvent) => {
            const {
                currentTarget : { result }
            } = fileEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }

    const clearAttachment = () => setAttachment(null);

    return (
        <form onSubmit={onSubmit} className='factoryForm'>
            <div className='factoryInput__container'>
                <input type="text" placeholder="what's on your mind" maxLength="120" value={nweet} onChange={onChange} className="factoryInput__input"/>
                <input type={'submit'} value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img src={attachment}   style={{
                        backgroundImage: attachment,
                    }} alt="preview"/>
                    <div className="factoryForm__clear" onClick={clearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFacotry;
