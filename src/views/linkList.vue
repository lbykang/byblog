<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="linkName" label="名称" width="120">
      </el-table-column>
      <el-table-column
        prop="linkUrl"
        label="url"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="typeName"
        label="链接类型"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="state" label="图标" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 40px;margin-bottom: -6px;"
            :src="scope.row.linkImage"
            :preview-src-list="images"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[15, 20, 30]"
      :page-size="15"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import headTop from "../components/headTop";
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0, //当前也
      limit: 20, //
      count: 0,
      total: 60, //总条数
      currentPage: 1,
      isChoose: false,
      countData: [],
      images: [],
      currentPage4: 4,
    };
  },
  components: {
    headTop,
  },
  created() {
    this.getLinks();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    photoList() {
      let final = [];
      for (let photo of this.photos) {
        final.push(photo.src);
      }
      let nowIndex = final.findIndex((photo) => photo === this.now);
      if (nowIndex > -1) {
        let start = final.slice(0, nowIndex);
        let end = final.slice(nowIndex);
        final = [...end, ...start];
      }
      return final;
    },
    handleSelectionChange() {},
    handleClick(row) {
      console.log(row);
    },
    imgScc: function() {
      this.isChoose = !this.isChoose;
    },
    async getLinks() {
      axios.get("/api/link/getLink").then((res) => {
        var _this = this;
        console.log(res);
        res.data.forEach((item) => {
          var linkList = item.linkList;
          linkList.forEach((link) => {
            var table = {};
            table.typeName = item.typeName;
            table.id = link.id;
            table.linkName = link.linkName;
            table.linkUrl = link.linkUrl;
            table.linkImage = link.linkImage;
            table.linkType = link.linkType;
            table.state = link.state;
            _this.images.push(link.linkImage);
            _this.tableData.push(table);
            console.log(_this.tableData);
            console.log(_this.images);
          });
        });
      });
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  height: 10%;
  float: right;
  margin: 20px;
}
td.el-table_1_column_6 {
  padding: 0px;
}
.table_container {
  padding: 20px;
}
.vueBox {
  text-align: center;
  margin-left: 300px;
  position: relative;
}

img {
  transform: scale(1); /*图片原始大小1倍*/
  transition: all ease 0.5s;
} /*图片放大所用时间*/

img.active {
  transform: scale(4); /*图片需要放大3倍*/
  position: fixed; /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
  z-index: 100;
}
</style>
