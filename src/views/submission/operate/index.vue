<template>
  <!-- 汇交操作流程5步 -->
  <div class="submission-operate-wrapper">
    <div class="operate-step-wrapper">
      <el-steps align-center :active="active" finish-status="success">
        <el-step v-for="(item, index) in stepMenu" :key="index" :title="item.title"></el-step>
      </el-steps>
    </div>
    <div class="operate-step-con">
      <!-- <transition> -->
      <!-- 步骤一：项目信息 -->
      <div class="project-info-wrapper" v-show="active==0">
        <el-form ref="firstForm" :model="firstForm" :rules="firstRules" label-width="100px">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="firstForm.projectName" disabled style="color: #333;"></el-input>
          </el-form-item>
          <el-form-item label="项目描述" prop="description">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入项目描述"
              v-model="firstForm.description"
            ></el-input>
          </el-form-item>
          <br />
          <el-form-item label="学科标签" prop="firstSubjectId">
            <el-select
              v-model="firstForm.firstSubjectId"
              placeholder="请选择一级学科"
              prop="firstSubjectId"
              v-if="firSubject"
            >
              <el-option
                v-for="(item, index) in firSubject.data"
                :key="index"
                :value="item.key"
                :label="item.value"
              ></el-option>
            </el-select>
            <el-select
              v-model="firstForm.secondSubjectId"
              placeholder="请选择二级学科"
              style="margin-left:10px"
              prop="secondSubjectId"
              v-if="secSubject"
            >
              <el-option
                v-for="(item, index) in secSubject.data"
                :key="index"
                :value="item.key"
                :label="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自定义标签" class="custom-tag">
            <el-col :span="7">
              <el-input v-model="customTag1" clearable placeholder="选填"></el-input>
            </el-col>
            <el-col :span="7" style="margin-left:10px">
              <el-input v-model="customTag2" clearable placeholder="选填"></el-input>
            </el-col>
            <el-col :span="7" style="margin-left:10px">
              <el-input v-model="customTag3" clearable placeholder="选填"></el-input>
            </el-col>
          </el-form-item>
          <br />
          <el-form-item label="数据分级" prop="dataGrading">
            <el-select v-model="firstForm.dataGrading" placeholder="请选择数据分级" v-if="dataType">
              <el-option
                v-for="(item, index) in dataType.data"
                :key="index"
                :value="item.key"
                :label="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据保护期" prop="dataProtection">
            <el-select v-model="firstForm.dataProtection" placeholder="请选择数据保护期" v-if="protectTime">
              <el-option
                v-for="(item, index) in protectTime.data"
                :key="index"
                :value="item.key"
                :label="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="接收中心" prop="dataCenterId">
            <el-select v-model="firstForm.dataCenterId" placeholder="请选择接收中心" v-if="getCenter">
              <el-option
                v-for="(item, index) in getCenter.data"
                :key="index"
                :value="item.key"
                :label="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 步骤二：选择数据 -->
      <div class="choose-data-wrapper" v-if="active==1">
        <div class="choose-data-form">
          <!-- <el-button type="danger" icon="el-icon-delete"></el-button> -->
          <el-button type="primary" size="medium">
            <router-link to="/submission/choose">
              <i class="iconfont el-icon-kf-Import"></i> 从已有项目中选择
            </router-link>
          </el-button>
          <el-upload
            class="upload-demo"
            :headers="{access_token: token}"
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-progress="uploadProgressHandle"
            :on-success="(res, file)=>uploadSuccessHandle(res, file, '0')"
            :on-error="uploadErrorHandle"
            :show-file-list="false"
            multiple
          >
            <el-button type="primary" size="medium">
              <i class="iconfont el-icon-kf-plus-circle"></i> 添加本地数据
            </el-button>
          </el-upload>
        </div>
        <el-table
          ref="multipleTable"
          v-if="fileList"
          :data="fileList"
          tooltip-effect="dark"
          style="width: 100%;border: 1px solid #EBEEF5;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="名称" prop="name" align="left" show-overflow-tooltip />
          <el-table-column prop="size" label="大小" width="150" align="left">
            <template slot-scope="scope" v-if="scope.row.size">{{ scope.row.size }} M</template>
          </el-table-column>
          <el-table-column
            label="类型"
            prop="fileType"
            show-overflow-tooltip
            align="left"
            width="150px"
          />
        </el-table>
        <div class="page-wrapper">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="parseInt(pageTotal)"
            layout="total, prev, pager, next,sizes"
            :page-sizes="[10, 20, 30, 40]"
          ></el-pagination>
        </div>
      </div>
      <!-- 步骤三：补充信息 -->
      <div class="addition-info-wrapper" v-show="active==2">
        <el-form
          ref="additionForm"
          :model="additionForm"
          :rules="additionFormRules"
          label-width="80px"
        >
          <el-form-item>
            <b>数据说明文档</b>
            <a class="downfile" :href="dataIntroDocTemplateUrl" download="数据说明文档模板">（点此下载示例文档）</a>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              :headers="{access_token: token}"
              :action="uploadUrl"
              :on-progress="uploadProgressHandle"
              :on-success="(res, file)=>uploadSuccessHandle(res, file, '1')"
              :on-preview="handlePreview"
              :on-remove="(file,filelist)=>handleRemove(file,filelist,'1')"
              :before-remove="beforeRemove"
              :file-list="readmeList"
              :limit="1"
              :on-exceed="handleExceed"
            >
              <el-button size="small" :icon="readmeName!==''?'el-icon-check':''" type="primary">上传</el-button>
              <small>&nbsp;&nbsp;请下载示例文档，按照本项目数据填写好上传上来</small>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <b>数据使用许可</b>
          </el-form-item>
          <el-form-item prop="useLicense">
            <el-radio-group v-model="additionForm.useLicense" class="user-license-radio">
              <el-radio :label="0" class="my_radio">CC0 1.0：用户使用不受限制</el-radio>
              <el-radio :label="1" class="my_radio">CC BY NC 3.0：除商业用途外，用户使用不受限制</el-radio>
              <el-radio
                :label="2"
                class="my_radio"
              >CC BY 4.0：用户使用时需遵循以下原则：署名；不可用于商业用途；不可再创作；不可添加额外限制</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <b>项目结题报告</b>
            <a class="downfile" :href="completeReportTemplateUrl" download="结题报告模板">（点此下载示例文档）</a>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              :headers="{access_token: token}"
              :action="uploadUrl"
              :before-upload="beforeUploadCloseReport"
              :on-progress="uploadProgressHandle"
              :on-success="(res, file)=>uploadSuccessHandle(res, file, '2')"
              :on-preview="handlePreview"
              :on-remove="(file,filelist)=>handleRemove(file,filelist,'2')"
              :before-remove="(file,filelist)=>beforeRemove(file,filelist,'2')"
              :file-list="closeReportList"
              accept=".doc, .pdf, .docx"
              :limit="1"
              :on-exceed="handleExceed"
            >
              <el-button
                size="small"
                :icon="closeReportName!==''?'el-icon-check':''"
                type="primary"
              >上传</el-button>
              <small>&nbsp;&nbsp;仅支持 doc，docx 和 pdf 格式</small>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <b>发表文献情况（文献格式为GB/T 7714）</b>
          </el-form-item>
          <el-form-item>
            <el-input
              type="textarea"
              :rows="6"
              v-model="additionForm.document"
              placeholder="李红莲[1], 王春花[2], 袁保宗[1]. 一种改进的支持向量机NN－SVM[J]. 计算机学报, 2003(8).Sch C, Laptev I, Caputo B. Recognizing Human Actions: A Local SVM Approach[C]// International Conference on Pattern Recognition. 2004."
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 步骤四：最终确认 -->
      <div class="final-certified-wrapper" v-show="active==3" id="final-certified-wrapper">
        <el-card class="base-info-card">
          <div slot="header" class="clearfix" @click="onBaseEditClick">
            <span style="font-weight: 700;">项目信息</span>
            <el-button
              style="float: right; padding: 3px 0;font-size:16px;"
              type="text"
              icon="el-icon-edit"
            ></el-button>
          </div>
          <el-form label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="项目名称：">{{firstForm.projectName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="接收中心：">{{dataCenterName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学科标签：">{{firstSubjectName }}{{' - '+secondSubjectName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据保护期：">{{dataProtectionName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="数据分级：">{{dataGradingName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="自定义标签："
                  v-if="customTag1 || customTag2 ||customTag3"
                >{{dataTag}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="项目描述：">{{firstForm.description}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="choose-data-card">
          <div slot="header" class="clearfix" @click="onChooseDataEditClick">
            <span style="font-weight: 700;">选择数据</span>
            <el-button
              style="float: right; padding: 3px 0;font-size:16px;"
              type="text"
              icon="el-icon-edit"
            ></el-button>
          </div>
          <el-table
            height="200"
            ref="dataListTable"
            v-if="fileList"
            :data="fileList"
            tooltip-effect="dark"
            style="width: 100%;border: 1px solid #EBEEF5;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="名称" prop="name" align="left" show-overflow-tooltip />
            <el-table-column prop="size" label="大小" width="150" align="left">
              <template slot-scope="scope" v-if="scope.row.size">{{ scope.row.size }} M</template>
            </el-table-column>
            <el-table-column
              label="类型"
              prop="fileType"
              show-overflow-tooltip
              align="left"
              width="150px"
            />
          </el-table>
          <div class="page-wrapper">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="parseInt(pageTotal)"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, prev, pager, next, sizes"
            ></el-pagination>
          </div>
        </el-card>
        <el-card class="addition-info-card">
          <div slot="header" class="clearfix" @click="onAdditionEditClick">
            <span style="font-weight: 700;">补充信息</span>
            <el-button
              style="float: right; padding: 3px 0;font-size:16px;"
              type="text"
              icon="el-icon-edit"
            ></el-button>
          </div>
          <el-form>
            <el-form-item v-if="readmeName!==''" label="说明文档：">{{readmeName}}</el-form-item>
            <el-form-item v-if="useLicenseName" label="数据使用许可：">{{useLicenseName}}</el-form-item>
            <el-form-item v-if="closeReportName!==''" label="项目结题报告：">{{closeReportName}}</el-form-item>
            <el-form-item v-if="additionForm.document" label="发表文献情况：">{{additionForm.document}}</el-form-item>
          </el-form>
        </el-card>
        <div class="self-commit-item">
          <el-checkbox
            v-model="promistion"
            label="个人承诺：本人上传的所有数据均为真实信息，如果出现问题，愿意承担所有责任。"
            name="type"
          ></el-checkbox>
        </div>
      </div>
      <!-- 步骤五：等待审核 -->
      <div class="wait-check-wrapper" v-show="active===5">
        <i class="iconfont el-icon-kf-right2"></i>
        <p class="wait-tips">您已完成{{firstForm.projectName}}项目汇交的所有步骤，请耐心等待后台审核！</p>
        <p>审核结果将通过平台消息和邮件的方式通知您！</p>
        <!-- <p>（可以在“个人中心 > 设置”中进行修改）</p> -->
      </div>
      <!-- </transition> -->
    </div>
    <div class="operate-step-btn">
      <el-button size="medium" v-if="active>0&&active<4" class="prev" @click="prev">上一步</el-button>
      <el-button size="medium" v-if="active<3" class="next" type="primary" @click="next">下一步</el-button>
      <el-button
        size="medium"
        v-if="active===3"
        class="next"
        type="primary"
        @click="openConfirm"
      >确 定</el-button>
      <el-button
        size="medium"
        v-if="active>3"
        class="next"
        type="primary"
        @click="handleSubmitSuccess"
      >确定</el-button>
    </div>
    <!-- 最终确认弹框 -->
    <el-dialog title="最终确认" :visible.sync="showDia" width="600px" :before-close="closeConfirm">
      <div class="final-dialog-wrapper">
        <h3>请确认一下信息</h3>
        <section>
          <div class="dialog-item">
            <el-checkbox v-model="checked1">
              <b>本次提交的数据, 一旦审核通过, 将不可删除或修改</b>
              <br />
              <span>您无法删除或修改本版本的数据, 但您可以发布一个新版本进行修改</span>
            </el-checkbox>
          </div>
          <div class="dialog-item">
            <el-checkbox v-model="checked2">
              <b>本次提交的数据, 将依照您之前提交的规则对外共享</b>
              <br />
              <span>对外共享后, 其他用户可以复制 下载本次数据</span>
            </el-checkbox>
          </div>
          <div class="dialog-item">
            <el-checkbox v-model="checked3">
              <b>我已确认本次提交的数据不包含敏感信息和个人信息</b>
              <br />
              <span>请参考其他说明文档</span>
            </el-checkbox>
          </div>
          <div class="dialog-item dialog-tip">
            <small>*三项均选中后方可点击“确定”按钮</small>
          </div>
        </section>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeConfirm" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitVerify" size="medium" :disabled="allAgree">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 最后编辑修改的dialog -->
    <el-dialog title="项目信息编辑" :visible.sync="showBaseInfoEdit">
      <el-form ref="firstForm" :model="currentFirstForm" :rules="firstRules" label-width="100px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="currentFirstForm.projectName" disabled style="color: #333;"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入项目描述"
            v-model="currentFirstForm.description"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="学科标签" prop="firstSubjectId">
          <el-select
            v-model="currentFirstForm.firstSubjectId"
            placeholder="请选择一级学科"
            prop="firstSubjectId"
            v-if="firSubject"
          >
            <el-option
              v-for="(item, index) in firSubject.data"
              :key="index"
              :value="item.key"
              :label="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="currentFirstForm.secondSubjectId"
            placeholder="请选择二级学科"
            style="margin-left:10px"
            prop="secondSubjectId"
            v-if="secSubject"
          >
            <el-option
              v-for="(item, index) in secSubject.data"
              :key="index"
              :value="item.key"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义标签" class="custom-tag">
          <el-col :span="7">
            <el-input v-model="currentCustomTag1" clearable placeholder="选填"></el-input>
          </el-col>
          <el-col :span="7" style="margin-left:10px">
            <el-input v-model="currentCustomTag2" clearable placeholder="选填"></el-input>
          </el-col>
          <el-col :span="7" style="margin-left:10px">
            <el-input v-model="currentCustomTag3" clearable placeholder="选填"></el-input>
          </el-col>
        </el-form-item>
        <br />
        <el-form-item label="数据分级" prop="dataGrading">
          <el-select v-model="currentFirstForm.dataGrading" placeholder="请选择数据分级" v-if="dataType">
            <el-option
              v-for="(item, index) in dataType.data"
              :key="index"
              :value="item.key"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据保护期" prop="dataProtection">
          <el-select
            v-model="currentFirstForm.dataProtection"
            placeholder="请选择数据保护期"
            v-if="protectTime"
          >
            <el-option
              v-for="(item, index) in protectTime.data"
              :key="index"
              :value="item.key"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="接收中心" prop="dataCenterId">
          <el-select v-model="currentFirstForm.dataCenterId" placeholder="请选择接收中心" v-if="getCenter">
            <el-option
              v-for="(item, index) in getCenter.data"
              :key="index"
              :value="item.key"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showBaseInfoEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitBaseInfoEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择数据编辑" :visible.sync="showChooseDataEdit">
      <div class="choose-data-form">
        <!-- <el-button type="danger" icon="el-icon-delete"></el-button> -->
        <el-button type="primary" size="medium">
          <router-link to="/submission/choose">
            <i class="iconfont el-icon-kf-Import"></i> 从已有项目中选择
          </router-link>
        </el-button>
        <el-upload
          class="upload-demo"
          :headers="{access_token: token}"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-progress="uploadProgressHandle"
          :on-success="(res, file)=>uploadSuccessHandle(res, file, '0')"
          :on-error="uploadErrorHandle"
          :show-file-list="false"
          multiple
        >
          <el-button type="primary" size="medium">
            <i class="iconfont el-icon-kf-plus-circle"></i> 添加本地数据
          </el-button>
        </el-upload>
      </div>
      <el-table
        height="300px"
        ref="multipleTable"
        v-if="fileList"
        :data="fileList"
        tooltip-effect="dark"
        style="width: 100%;border: 1px solid #EBEEF5;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称" prop="name" align="left" show-overflow-tooltip />
        <el-table-column prop="size" label="大小" width="150" align="left">
          <template slot-scope="scope" v-if="scope.row.size">{{ scope.row.size }} M</template>
        </el-table-column>
        <el-table-column
          label="类型"
          prop="fileType"
          show-overflow-tooltip
          align="left"
          width="150px"
        />
      </el-table>
      <div class="page-wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="parseInt(pageTotal)"
          layout="total, prev, pager, next,sizes"
          :page-sizes="[10, 20, 30, 40]"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showChooseDataEdit = false">关 闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="补充信息编辑" :visible.sync="showAdditionEdit" :before-close="cancelAdditionEdit">
      <el-form
        ref="additionForm"
        :model="currentAdditionForm"
        :rules="additionFormRules"
        label-width="10px"
      >
        <el-form-item>
          <b>数据说明文档</b>
          <a class="downfile" :href="dataIntroDocTemplateUrl" download="数据说明文档模板">（点此下载示例文档）</a>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            :headers="{access_token: token}"
            :action="uploadUrl"
            :on-progress="uploadProgressHandle"
            :on-success="(res, file)=>uploadSuccessHandle(res, file, '1')"
            :on-preview="handlePreview"
            :on-remove="(file,filelist)=>handleRemove(file,filelist,'1')"
            :before-remove="beforeRemove"
            :file-list="readmeList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button size="small" :icon="readmeName!==''?'el-icon-check':''" type="primary">上传</el-button>
            <small>&nbsp;&nbsp;请下载示例文档，按照本项目数据填写好上传上来</small>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <b>数据使用许可</b>
        </el-form-item>
        <el-form-item prop="useLicense">
          <el-radio-group v-model="currentAdditionForm.useLicense" class="user-license-radio">
            <el-radio :label="0" class="my_radio">CC0 1.0：用户使用不受限制</el-radio>
            <el-radio :label="1" class="my_radio">CC BY NC 3.0：除商业用途外，用户使用不受限制</el-radio>
            <el-radio :label="2" class="my_radio">CC BY 4.0：用户使用时需遵循以下原则：署名；不可用于商业用途；不可再创作；不可添加额外限制</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <b>项目结题报告</b>
          <a class="downfile" :href="completeReportTemplateUrl" download="结题报告模板">（点此下载示例文档）</a>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            :headers="{access_token: token}"
            :action="uploadUrl"
            :before-upload="beforeUploadCloseReport"
            :on-progress="uploadProgressHandle"
            :on-success="(res, file)=>uploadSuccessHandle(res, file, '2')"
            :on-preview="handlePreview"
            :on-remove="(file,filelist)=>handleRemove(file,filelist,'2')"
            :before-remove="(file,filelist)=>beforeRemove(file,filelist,'2')"
            :file-list="closeReportList"
            accept=".doc, .pdf, .docx"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button
              size="small"
              :icon="closeReportName!==''?'el-icon-check':''"
              type="primary"
            >上传</el-button>
            <small>&nbsp;&nbsp;仅支持 doc，docx 和 pdf 格式</small>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <b>发表文献情况（文献格式为GB/T 7714）</b>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="6"
            v-model="currentAdditionForm.document"
            placeholder="李红莲[1], 王春花[2], 袁保宗[1]. 一种改进的支持向量机NN－SVM[J]. 计算机学报, 2003(8).Sch C, Laptev I, Caputo B. Recognizing Human Actions: A Local SVM Approach[C]// International Conference on Pattern Recognition. 2004."
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdditionEdit">取 消</el-button>
        <el-button type="primary" @click="submitAdditionInfoEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import { submissionApi, baseApi, dataApi } from '@/service'
import appConfig from '@/config'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'submissionOperate',

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      active: 0,
      pid: '', // 项目数据id
      applyDirId: '', // 数据说明id
      concludingDirId: '', // 项目结题id
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      showDia: false,
      checked1: false, // 是否同意三项条款1
      checked2: false, // 是否同意三项条款2
      checked3: false, // 是否同意三项条款3
      promistion: false, // 是否同意个人承诺
      firSubject: null, // 下拉数据：一级学科
      secSubject: null, // 下拉数据：二级学科
      dataType: null, // 下拉数据：数据分级
      protectTime: null, // 下拉数据：数据保护期
      getCenter: null, // 下拉数据：接受中心
      showBaseInfoEdit: false, // 是否显示项目信息编辑dialog
      showChooseDataEdit: false,
      showAdditionEdit: false,
      customTag1: '', // 自定义标签1
      customTag2: '', // 自定义标签2
      customTag3: '', // 自定义标签3
      currentCustomTag1: '', // 自定义标签1
      currentCustomTag2: '', // 自定义标签2
      currentCustomTag3: '', // 自定义标签3
      uploadUrl: `${appConfig.baseUrl}/file/file/upload`,
      stepMenu: [
        {
          title: '项目信息'
        },
        {
          title: '选择数据'
        },
        {
          title: '补充信息'
        },
        {
          title: '最终确认'
        },
        {
          title: '等待审核'
        }
      ],
      firstForm: {
        id: '',
        projectName: '',
        description: '', // 项目描述
        dataTag: '', // 自定义标签
        firstSubjectId: '', // 学科标签
        secondSubjectId: '',
        secondSubjectName: '',
        firstSubjectName: '',
        dataGrading: '', // 数据分级
        dataGradingName: '',
        dataProtection: '', // 数据保护期
        dataProtectionName: '', // 数据保护期val
        dataCenterId: '', // 接收中心
        dataCenterName: '',
        updateReason: '',
        descDocFile: '', // 数据说明文档url
        completeReport: '' // 结题报告url
      },
      currentFirstForm: {},
      firstRules: {
        projectName: { required: true, message: '请输入项目名称', trigger: 'blur' },
        description: { required: true, message: '请输入项目描述', trigger: 'blur' },
        firstSubjectId: { required: true, message: '请选择一级标签', trigger: 'change' },
        secondSubjectId: { required: true, message: '请选择二级标签', trigger: 'change' },
        dataGrading: { required: true, message: '请选择数据分级', trigger: 'change' },
        dataProtection: { required: true, message: '请选择数据保护期', trigger: 'change' },
        dataCenterId: { required: true, message: '请选择接收中心', trigger: 'change' }
      },
      fileList: [], // 选择数据列表
      additionForm: {
        useLicense: 0,
        useLicenseName: '',
        document: ''
      },
      currentAdditionForm: {},
      additionFormRules: {
        useLicense: [{ required: true, message: '请选择数据使用许可' }]
      },
      closeReportList: [],
      readmeList: [],
      closeReportName: '', // 结题报告名
      readmeName: '', // 数据说明文档名
      completeReportTemplateUrl: '',
      dataIntroDocTemplateUrl: ''
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getBaseInfo()
    })
  },

  activated() {
    this.$nextTick(() => {
      this.active = 0
      // console.log('activated', this.active)
    })
  },

  computed: {
    ...mapGetters(['userInfo', 'token']),
    // 一级学科
    firstSubjectName() {
      let val = ''
      if (
        this.firstForm.firstSubjectId &&
        this.firstForm.firstSubjectId !== '' &&
        this.firSubject &&
        this.firSubject.data.length
      ) {
        this.firSubject.data.forEach((item) => {
          if (item.key === this.firstForm.firstSubjectId) {
            val = item.value
          }
        })
      }
      return val
    },

    // 二级学科
    secondSubjectName() {
      let val = ''
      if (
        this.firstForm.secondSubjectId &&
        this.firstForm.secondSubjectId !== '' &&
        this.secSubject &&
        this.secSubject.data.length
      ) {
        this.secSubject.data.forEach((item) => {
          if (item.key === this.firstForm.secondSubjectId) {
            val = item.value
          }
        })
      }
      return val
    },

    // 数据中心
    dataCenterName() {
      let val = ''
      if (this.firstForm.dataCenterId !== '' && this.getCenter && this.getCenter.data.length) {
        this.getCenter.data.forEach((item) => {
          if (item.key === this.firstForm.dataCenterId) {
            val = item.value
          }
        })
      }
      return val
    },

    // 数据分级
    dataGradingName() {
      let val = ''
      if (this.firstForm.dataGrading !== '' && this.dataType && this.dataType.data.length) {
        this.dataType.data.forEach((item) => {
          if (item.key === this.firstForm.dataGrading) {
            val = item.value
          }
        })
      }
      return val
    },

    // 数据保护期
    dataProtectionName() {
      let val = ''
      if (
        this.firstForm.dataProtection !== '' &&
        this.protectTime &&
        this.protectTime.data.length
      ) {
        this.protectTime.data.forEach((item) => {
          if (item.key === this.firstForm.dataProtection) {
            val = item.value
          }
        })
      }
      return val
    },

    chooseFilesName() {
      if (this.fileList && this.fileList.length) {
        return [...this.fileList.map((item) => item.name)]
      } else {
        return ''
      }
    },
    // 用户许可
    useLicenseName() {
      let res = ''
      switch (this.additionForm.useLicense) {
        case 0:
          res = 'CC0 1.0：用户使用不受限制'
          break
        case 1:
          res = 'CC BY NC 3.0：除商业用途外，用户使用不受限制'
          break
        case 2:
          res =
            'CC BY 4.0：用户使用时需遵循以下原则：署名；不可用于商业用途；不可再创作；不可添加额外限制'
          break
        default:
          res = ''
          break
      }
      return res
    },

    // 自定义标签
    dataTag() {
      let arr = []
      if (this.customTag1) {
        arr.push(this.customTag1)
      }
      if (this.customTag2) {
        arr.push(this.customTag2)
      }
      if (this.customTag3) {
        arr.push(this.customTag3)
      }
      return arr.join(',')
    },

    allAgree() {
      if (!this.checked1 || !this.checked2 || !this.checked3) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    ...mapActions(['delView']),

    async getFileTemplate() {
      const [temp1, temp2] = await Promise.all([
        baseApi.downFile({ type: 'project' }),
        baseApi.downFile({ type: 'data' })
      ])
      this.completeReportTemplateUrl = temp1.data
      this.dataIntroDocTemplateUrl = temp2.data
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getFileList()
    },

    // 表格分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getFileList()
      this.$refs.viewBox.scrollTop = 0
    },

    // 获取pid
    async getDirId() {
      try {
        const res = await dataApi.getDirId(this.firstForm.id)
        if (res.data.concludingDirId) {
          this.concludingDirId = res.data.concludingDirId
        }
        if (res.data.applyDirId) {
          this.applyDirId = res.data.applyDirId
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取基本信息
    async getBaseInfo() {
      try {
        if (!this.id) {
          this.$router.push('/submission/list')
          return
        }
        const res = await submissionApi.findBaseInfo(this.id)
        if (res.data.isSubmit === 1) {
          this.active = 5
          return
        }
        if (res.data.checkStatus === '1') {
          this.$router.push('/submission/list') // 不满足编辑条件
          return
        }
        const dataMap = res.data
        this.pid = dataMap.dataDirId
        this.firstForm.id = dataMap.id
        this.firstForm.projectName = dataMap.projectName
        this.firstForm.description = dataMap.description
        this.customTag1 = dataMap.dataTag ? dataMap.dataTag.split(',')[0] : ''
        this.customTag2 = dataMap.dataTag ? dataMap.dataTag.split(',')[1] : ''
        this.customTag3 = dataMap.dataTag ? dataMap.dataTag.split(',')[2] : ''
        this.firstForm.firstSubjectId = dataMap.firstSubjectId
        this.firstForm.secondSubjectId = dataMap.secondSubjectId
        this.firstForm.dataGrading = dataMap.dataGrading.toString()
        this.firstForm.dataGradingName = dataMap.dataGradingName
        this.firstForm.dataProtection = dataMap.dataProtection || '1'
        this.firstForm.dataCenterId = dataMap.dataCenterId
        this.readmeName = dataMap.descDocFile ? dataMap.descDocFile.split('/').reverse()[0] : ''
        this.closeReportName = dataMap.completeReport
          ? dataMap.completeReport.split('/').reverse()[0]
          : ''
        this.closeReportList = dataMap.completeReport
          ? [{ name: this.closeReportName, url: dataMap.completeReport }]
          : []
        this.readmeList = dataMap.descDocFile
          ? [{ name: this.readmeName, url: dataMap.descDocFile }]
          : []
        this.additionForm.useLicense = parseInt(dataMap.useLicense) || 0 // 数据使用许可
        this.additionForm.document = dataMap.document // 文献
        this.getSelects()
        this.getFileTemplate()
        this.getFileList()
        this.getDirId() // 获取上传文件后保存所需id
      } catch (error) {
        console.log(error)
      }
    },

    // 获取下拉框数据
    async getSelects() {
      try {
        this.firSubject = await baseApi.userconfigWork('first')
        this.secSubject = await baseApi.userconfigWork('second')
        this.dataType = await baseApi.userconfigWork('datatype')
        this.protectTime = await baseApi.userconfigWork('peotecttime')
        this.getCenter = await baseApi.userconfigWork('getcenter')
      } catch (error) {
        console.log(error)
      }
    },

    // 获取选择的数据列表
    async getFileList() {
      try {
        const res = await dataApi.getFileList({
          pid: this.pid,
          search: '',
          // level: 1, // 不传了，后端自己取
          flag: 1,
          current: this.currentPage,
          size: this.pageSize
        })
        this.fileList = res.data.records
        this.pageTotal = res.data.total
        this.pageSize = res.data.size
        this.currentPage = res.data.current
      } catch (error) {
        console.log(error)
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleRemove(file, fileList, fileType) {
      if (fileType === '1') {
        this.readmeName = ''
        this.readmeList = []
      } else if (fileType === '2') {
        this.closeReportName = ''
        this.closeReportList = []
      }
    },

    handlePreview(file) {
      // console.log(file)
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
          fileList.length} 个文件`
      )
    },

    beforeRemove(file, fileList, type) {
      // 项目结题报告格式过滤
      if (type === '2') {
        const filetype = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (filetype === 'doc' || filetype === 'pdf' || filetype === 'docx') {
          return this.$confirm(`确定移除 ${file.name}？`)
        } else {
          return true
        }
      } else {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },

    // 结题报告格式限制
    beforeUploadCloseReport(file) {
      const filetype = file.name.substring(file.name.lastIndexOf('.') + 1)
      console.log(filetype)
      const isdoc = filetype === 'doc'
      const isdocx = filetype === 'docx'
      const ispdf = filetype === 'pdf'

      if (!isdoc && !isdocx && !ispdf) {
        this.closeReportList = []
        this.$message.error('上传文件只能是doc、docx或pdf格式!')
      }
      return isdoc || isdocx || ispdf
    },

    // 文件上传过程中
    uploadProgressHandle() {
      // 加载动画
      Loading.service({
        lock: false, // true时会导致隐藏滚动条
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'loading-custom-class'
      })
    },

    // 文件上传成功的回调(自定义参数fileType：0；1数据说明文档；2结题报告)
    uploadSuccessHandle(res, file, fileType) {
      console.log(res)
      Loading.service().close() // 关闭loading
      let uploadFlag = true
      this.fileList.map((item) => {
        if (item.id === res.data.id) {
          uploadFlag = false
        }
      })
      if (uploadFlag) {
        this.saveFile(res.data, fileType)
      } else {
        this.$message.error('请不要上传相同文件！')
      }
    },

    // 保存上传后的文件
    async saveFile(data, fileType) {
      try {
        let pid = ''
        if (fileType === '0') {
          pid = this.pid
        } else if (fileType === '1') {
          pid = this.applyDirId
        } else if (fileType === '2') {
          pid = this.concludingDirId
        }
        await submissionApi.saveUploadFile({
          name: data.name,
          dataType: 0, // 0=汇交项目数据, 1=项目管理数据
          size: data.size,
          location: data.url,
          projectId: this.firstForm.id,
          projectName: this.firstForm.projectName,
          md5: data.id,
          pid: pid,
          type: fileType,
          flag: 0
        })
        if (fileType !== '0') {
          const tip = fileType === '1' ? '数据说明文档' : '项目结题报告'
          this.$message.success(`${tip}上传成功！`)
        } else {
          this.currentPage = 1
          this.getFileList()
        }
        if (fileType === '1') {
          this.readmeName = data.name
          this.readmeList = [{ name: data.name, url: data.url }]
        } else if (fileType === '2') {
          this.closeReportName = data.name
          this.closeReportList = [{ name: data.name, url: data.url }]
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 文件上传失败
    uploadErrorHandle() {
      this.$message({
        type: 'error',
        message: '文件上传失败，请稍后重试~',
        duration: 2000
      })
    },

    // 显示确认框
    openConfirm() {
      if (!this.promistion) {
        if (this.getMsgLength() === 0) {
          this.$message.warning('请同意个人承诺!')
          let main = document.getElementById('final-certified-wrapper') // 滚动的DOM，一般是父级
          main.scrollTo(0, main.offsetHeight)
        }
      } else {
        this.showDia = true
      }
    },

    closeConfirm() {
      this.checked1 = this.checked2 = this.checked3 = false
      this.showDia = false
    },

    getMsgLength() {
      return document.getElementsByClassName('el-message').length
    },

    next() {
      // 做表单验证
      if (this.active === 0) {
        this.$refs.firstForm.validate((valid) => {
          if (valid) {
            this.active++
          } else {
            // console.log('必填项不能为空!')
            return false
          }
        })
      } else if (this.active === 1) {
        if (!this.fileList.length) {
          if (this.getMsgLength() === 0) {
            this.$message.warning('请添加数据~')
          }
        } else {
          this.active++
        }
      } else if (this.active === 2) {
        if (this.readmeName === '') {
          if (this.getMsgLength() === 0) {
            this.$message.warning('请上传数据说明文档')
          }
        } else if (this.closeReportName === '') {
          if (this.getMsgLength() === 0) {
            this.$message.warning('请上传结题报告')
          }
        } else {
          this.active++
        }
      } else {
        if (this.active++ > 4) this.active = 4
      }
    },

    prev() {
      if (this.active-- <= 0) this.active = 0
    },

    // 提交汇交审核
    async submitVerify() {
      if (!this.checked1 || !this.checked2 || !this.checked3) {
        this.$message.warning('请同意所有条款~')
        return
      }
      this.closeConfirm()
      this.firstForm.firstSubjectName = this.firstSubjectName
      this.firstForm.secondSubjectName = this.secondSubjectName
      this.firstForm.dataCenterName = this.dataCenterName
      this.firstForm.dataTag = this.dataTag
      this.firstForm.descDocFile = this.readmeList[0].url
      this.firstForm.completeReport = this.closeReportList[0].url
      this.firstForm.dataProtectionName = this.dataProtectionName
      this.additionForm.useLicenseName = this.useLicenseName
      this.firstForm.dataGradingName = this.dataGradingName
      const postData = { ...this.firstForm, ...this.additionForm }
      try {
        await submissionApi.submitVerify(postData)
        this.active = 5
        this.delView({
          path: this.$route.path
        })
      } catch (error) {
        console.log(error)
      }
    },

    handleSubmitSuccess() {
      this.$router.push('/submission/list')
    },

    onBaseEditClick() {
      this.showBaseInfoEdit = true
      this.currentFirstForm = JSON.parse(JSON.stringify(this.firstForm))
      this.currentCustomTag1 = this.customTag1 // 自定义标签1
      this.currentCustomTag2 = this.customTag2 // 自定义标签2
      this.currentCustomTag3 = this.customTag3 // 自定义标签3
    },

    onChooseDataEditClick() {
      this.showChooseDataEdit = true
    },

    onAdditionEditClick() {
      this.showAdditionEdit = true
      this.currentAdditionForm = JSON.parse(JSON.stringify(this.additionForm))
    },

    // 提交项目信息编辑dialog
    submitBaseInfoEdit() {
      if (this.currentFirstForm.description.trim()) {
        this.firstForm = JSON.parse(JSON.stringify(this.currentFirstForm))
        this.customTag1 = this.currentCustomTag1
        this.customTag2 = this.currentCustomTag2
        this.customTag3 = this.currentCustomTag3
        this.showBaseInfoEdit = false
      } else {
        if (this.getMsgLength() === 0) {
          this.$message.warning('请输入项目描述~')
        }
      }
    },

    // 提交补充信息编辑dialog
    submitAdditionInfoEdit() {
      if (this.readmeList.length === 0) {
        if (this.getMsgLength() === 0) {
          this.$message.warning('请上传数据说明文档~')
        }
      } else if (this.closeReportList.length === 0) {
        if (this.getMsgLength() === 0) {
          this.$message.warning('请上传项目结题报告~')
        }
      } else {
        this.additionForm = JSON.parse(JSON.stringify(this.currentAdditionForm))
        this.showAdditionEdit = false
      }
    },

    handleClose() {},
    // 取消编辑补充信息dialog
    cancelAdditionEdit() {
      if (this.readmeList.length === 0) {
        if (this.getMsgLength() === 0) {
          this.$message.warning('请上传数据说明文档~')
        }
      } else if (this.closeReportList.length === 0) {
        if (this.getMsgLength() === 0) {
          this.$message.warning('请上传项目结题报告~')
        }
      } else {
        this.showAdditionEdit = false
      }
    }
  },

  watch: {
    id(newVal) {
      this.getBaseInfo()
      this.getSelects()
      this.getFileTemplate()
    }
  }
}
</script>
<style lang='less' scoped>
.submission-operate-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column nowrap;
  padding-bottom: 30px;
  background: #fff;
  .operate-step-wrapper {
    width: 650px;
    padding: 30px 0 50px;
  }
  .operate-step-con {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px 15px 10px;
    .choose-data {
      width: 100%;
    }
  }
  .operate-step-btn {
    padding-top: 30px;
  }
  .dialog-item {
    padding-bottom: 25px;
    label {
      display: flex;
      align-items: flex-start;
      b {
        font-weight: normal;
        position: relative;
        top: -3px;
      }
      span {
        color: #999;
      }
    }
  }
  .dialog-tip {
    color: #409eff;
  }
  .choose-data-wrapper {
    width: 750px;
  }
  .choose-data-form {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
    button {
      margin-left: 20px;
    }
  }
  .user-license-radio {
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid #eee;
    padding: 5px 10px;
    border-radius: 5px;
    label {
      padding: 3px;
    }
  }
  .addition-info-wrapper {
    width: 750px;
    small {
      color: #999;
    }
  }
  .downfile {
    color: #409eff;
    cursor: pointer;
  }
  .final-certified-wrapper {
    width: 100%;
    height: calc(100vh - 350px);
    overflow-y: scroll;
    .base-info-item,
    .choose-data-item,
    .addition-info-item {
      line-height: 25px;
    }
    .self-commit-item{
      position: fixed;
      bottom: 100px;
      color: #409eff;
    }
    li {
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 20px;
      font-size: 14px;
      &:last-child {
        border-bottom: none;
        padding-top: 20px;
      }
      h4 {
        // color: #5f768d;
        // font-weight: 500;
        i {
          color: #5f768d;
          border-bottom: 1px solid #5f768d;
          cursor: pointer;
        }
      }
      span {
        padding-right: 30px;
        i {
          font-style: normal;
          &:first-child {
            color: #999;
          }
        }
      }
    }
  }
  .wait-check-wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    i {
      font-size: 40px;
      color: #409eff;
    }
    p {
      color: #b2bacb;
      margin: 5px;
    }
    p.wait-tips {
      color: #5f768d;
      padding: 40px 0 30px;
    }
  }
  .page-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
}
</style>
<style lang='less'>
.submission-operate-wrapper {
  .el-radio {
    white-space: normal !important;
  }
  .final-certified-wrapper {
    .el-card {
      margin-bottom: 20px;
    }
    .el-card__header {
      padding: 14px 15px 8px;
      cursor: pointer;
      color: #409eff;
      &:hover{
        background: #eee;
      }
    }
    .el-card__body {
      padding: 12px 15px 5px;
    }
    .base-info-card {
      .el-card__body {
        height: 210px;
        overflow-y: scroll;
      }
    }
    .addition-info-card {
      .el-card__body {
        height: 180px;
        overflow-y: scroll;
      }
    }
  }
  .el-dialog__header {
    background: #eee;
    padding: 13px 20px 10px;
  }
  .el-dialog__headerbtn {
    top: 15px;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .el-dialog__footer button:first-child {
    margin-right: 50px;
  }
}
</style>
