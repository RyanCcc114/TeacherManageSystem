<template>
  <div>
    <el-calendar first-day-of-week='7' v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <!--自定义内容-->
        <div>
          <div class="calendar-day">
            {{ data.day.split("-").slice(2).join("-") }}
          </div>
          <div v-for="item in calendarData">
            <div
              v-if="item.months.indexOf(data.day.split('-').slice(1)[0]) != -1"
            >
              <div
                v-if="
                  item.days.indexOf(data.day.split('-').slice(2).join('-')) !=
                  -1
                "
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.things"
                  placement="right"
                >
                  <div class="is-selected">{{ item.things }}</div>
                </el-tooltip>
              </div>
              <div v-else></div>
            </div>
            <div v-else></div>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      calendarData: [
        { months: ["01"], days: ["04",'11','18','25','07','14','21','28'],things: "JAVA网络编程" },
        { months: ["02"], days: ["01",'08','15','22','04','11','18','25'],things: "JAVA网络编程" },
        { months: ["03"], days: ["01",'08','15','22','04','11','18','25'],things: "JAVA网络编程" },
        { months: ["01"], days: ["06",'13','20','27','08','15','22','29'], things: "数据结构" },
        { months: ["02"], days: ["03",'10','17','24','05','12','19','26'], things: "数据结构" },
        { months: ["03"], days: ["03",'10','17','24','05','12','19','26'], things: "数据结构" },
      ],
      value: new Date(),
    };
  },
};
</script>

<style>
.is-selected {
  color: #1989fa;
}
</style>