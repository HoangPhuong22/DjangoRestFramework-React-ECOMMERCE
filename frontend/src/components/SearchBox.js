import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function SearchBox() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword)
        {
            navigate(`/?keyword=${keyword}&page=1`);
        }
    };
    return (
        <Form onSubmit={submitHandler} className="d-flex mx-5 py-3">
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Bạn cần tìm gì nhỉ?...."
                className="mr-sm-2 ml-sm-5"
            />
            <Button
                type="submit"
                variant="outline-success"
                className="p-2 mx-3"
            >
                Tìm
            </Button>
        </Form>
    );
}

export default SearchBox;
