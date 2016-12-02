<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class kv extends REST_Controller {

	function __construct()
    {
        // Construct the parent class
        parent::__construct();
    }

    public function index_get($gp)
    {
        
        $this->load->database();

        if ($gp==='0')
        {
            $sql="select gp,id,k,v,sort from kv order by sort";    
        }
        else
        {
            $sql="select gp,id,k,v,sort from kv where gp='".$gp."' order by sort";    
        }
        
        //echo $sql;
        $query = $this->db->query($sql);
        
        $list=array();
        foreach ($query->result() as $row)
        {
            $list[]=array('id'=>$row->id,'gp'=>$row->gp,'k'=>$row->k,'v'=>$row->v,'sort'=>$row->sort);
        }
        $o=new stdClass;
        $o->success=true;
        //$fdlist=array();
        $fdlist=array('v'=>'名稱','sort'=>'排序');
        $o->fd=$fdlist;
        $o->data=$list;
        $this->set_response($o, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
    }

    public function index_post()
    {
        // $this->some_model->update_user( ... );

    	if ( ($this->post('v')==null) )
    	{

    		$this->set_response(['success'=>false,'message'=>'請輸入名稱'], REST_Controller::HTTP_BAD_REQUEST); 
    		return;
    	}

        $data = array(
            'gp' => $this->post('gp'),
            'v' => $this->post('v'),
            'sort' => $this->post('sort')
        );

        $this->load->database();
        $r=$this->db->insert('kv',$data);

        $result=[
        	'result'=>$r,
        	'id'=>$this->db->insert_id()
        ];

        $this->set_response($result, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function index_delete()
    {
        $this->load->database();
        $id = $this->delete('id');
        $this->db
            ->where('id', $id)
            ->delete('kv');
        
        $this->response([
            'status' => TRUE,
            'message' => 'API key was deleted'
            ], REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code            

    }

    public function index_put()
    {
        // $this->some_model->update_user( ... );

        if ( ($this->put('v')==null) )
        {

            $this->set_response(['success'=>false,'message'=>'請輸入名稱'], REST_Controller::HTTP_BAD_REQUEST); 
            return;
        }

        $id=$this->put('id');

        $data = array(
            'v' => $this->put('v'),
            'sort' => $this->put('sort')
        );

        $this->load->database();
        $this->db->where('id',$id);
        $r=$this->db->update('kv',$data);

        $result=[
            'result'=>$r,
            'id'=>$id
        ];

        $this->set_response($result, REST_Controller::HTTP_ACCEPTED); // CREATED (201) being the HTTP response code
    }

}

